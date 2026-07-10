
-- 1. Create private schema for internal helpers not exposed via the Data API
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

REVOKE ALL ON FUNCTION private.has_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(UUID, public.app_role) TO authenticated, service_role;

-- 2. Recreate every policy that referenced public.has_role using private.has_role
DROP POLICY IF EXISTS "Users see their own roles" ON public.user_roles;
CREATE POLICY "Users see their own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Entitled users see active packages" ON public.software_packages;
CREATE POLICY "Entitled users see active packages" ON public.software_packages FOR SELECT TO authenticated
  USING (
    private.has_role(auth.uid(), 'admin')
    OR (is_active AND EXISTS (
      SELECT 1 FROM public.entitlements e
      WHERE e.tool_slug = software_packages.tool_slug
        AND e.active
        AND (e.user_id = auth.uid() OR lower(e.email) = lower(COALESCE(auth.jwt()->>'email','')))
    ))
  );

DROP POLICY IF EXISTS "Admins manage packages" ON public.software_packages;
CREATE POLICY "Admins manage packages" ON public.software_packages FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users see own downloads" ON public.download_events;
CREATE POLICY "Users see own downloads" ON public.download_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'));

-- 3. Explicit insert path for download tracking: users may only record their own events
CREATE POLICY "Users insert own downloads" ON public.download_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own submissions" ON public.crypto_payment_submissions;
CREATE POLICY "Users view own submissions" ON public.crypto_payment_submissions FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(COALESCE(auth.jwt()->>'email',''))
    OR private.has_role(auth.uid(), 'admin')
  );

DROP POLICY IF EXISTS "Admins update submissions" ON public.crypto_payment_submissions;
CREATE POLICY "Admins update submissions" ON public.crypto_payment_submissions FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins view all orders" ON public.orders;
CREATE POLICY "Admins view all orders" ON public.orders FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins view all entitlements" ON public.entitlements;
CREATE POLICY "Admins view all entitlements" ON public.entitlements FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage software bucket" ON storage.objects;
CREATE POLICY "Admins manage software bucket" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'software-packages' AND private.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'software-packages' AND private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users view own proofs" ON storage.objects;
CREATE POLICY "Users view own proofs" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND ((storage.foldername(name))[1] = auth.uid()::text OR private.has_role(auth.uid(), 'admin')));

-- 4. Drop the public wrapper so signed-in users can no longer invoke it via the Data API
DROP FUNCTION IF EXISTS public.has_role(UUID, public.app_role);
