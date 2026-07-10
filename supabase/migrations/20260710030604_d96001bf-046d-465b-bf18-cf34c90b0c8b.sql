
CREATE TYPE public.app_role AS ENUM ('user', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Users see their own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.software_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug TEXT NOT NULL,
  version TEXT NOT NULL,
  release_notes TEXT,
  file_path TEXT NOT NULL,
  file_size_bytes BIGINT,
  os_support TEXT[] DEFAULT ARRAY['Windows','macOS','Linux']::TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.software_packages TO authenticated;
GRANT ALL ON public.software_packages TO service_role;
ALTER TABLE public.software_packages ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_packages_tool_active ON public.software_packages(tool_slug, is_active);

CREATE POLICY "Entitled users see active packages" ON public.software_packages FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR (is_active AND EXISTS (
      SELECT 1 FROM public.entitlements e
      WHERE e.tool_slug = software_packages.tool_slug
        AND e.active
        AND (e.user_id = auth.uid() OR lower(e.email) = lower(COALESCE(auth.jwt()->>'email','')))
    ))
  );
CREATE POLICY "Admins manage packages" ON public.software_packages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER packages_updated_at BEFORE UPDATE ON public.software_packages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.download_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  package_id UUID REFERENCES public.software_packages(id) ON DELETE SET NULL,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.download_events TO authenticated;
GRANT ALL ON public.download_events TO service_role;
ALTER TABLE public.download_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_download_events_user ON public.download_events(user_id, created_at DESC);

CREATE POLICY "Users see own downloads" ON public.download_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.crypto_payment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  txid TEXT NOT NULL,
  wallet_used TEXT,
  screenshot_path TEXT,
  amount_expected NUMERIC,
  coin TEXT,
  network TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','verified','rejected','info_requested')),
  admin_note TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.crypto_payment_submissions TO authenticated;
GRANT ALL ON public.crypto_payment_submissions TO service_role;
ALTER TABLE public.crypto_payment_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_crypto_status ON public.crypto_payment_submissions(status, created_at DESC);

CREATE POLICY "Users insert own submissions" ON public.crypto_payment_submissions FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    OR lower(email) = lower(COALESCE(auth.jwt()->>'email',''))
  );
CREATE POLICY "Users view own submissions" ON public.crypto_payment_submissions FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(COALESCE(auth.jwt()->>'email',''))
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Admins update submissions" ON public.crypto_payment_submissions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER crypto_submissions_updated_at BEFORE UPDATE ON public.crypto_payment_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'crypto';

CREATE POLICY "Users insert own orders" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    OR lower(email) = lower(COALESCE(auth.jwt()->>'email',''))
  );

CREATE POLICY "Admins view all orders" ON public.orders FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins view all entitlements" ON public.entitlements FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage RLS (buckets created separately via tool)
CREATE POLICY "Admins manage software bucket" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'software-packages' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'software-packages' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users upload own proofs" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users view own proofs" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
