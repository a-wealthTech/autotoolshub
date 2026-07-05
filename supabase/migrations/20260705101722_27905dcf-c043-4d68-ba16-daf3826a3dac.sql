
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  tool_slug TEXT NOT NULL,
  tool_name TEXT,
  paddle_transaction_id TEXT UNIQUE,
  paddle_customer_id TEXT,
  paddle_subscription_id TEXT,
  amount NUMERIC(12,2),
  currency TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders by user_id"
  ON public.orders FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders by email"
  ON public.orders FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce((auth.jwt() ->> 'email'), '')));

CREATE INDEX orders_email_idx ON public.orders (lower(email));
CREATE INDEX orders_user_idx ON public.orders (user_id);
CREATE INDEX orders_tool_idx ON public.orders (tool_slug);

CREATE TABLE public.entitlements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  tool_slug TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  source_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email, tool_slug)
);

GRANT SELECT ON public.entitlements TO authenticated;
GRANT ALL ON public.entitlements TO service_role;

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own entitlements by user_id"
  ON public.entitlements FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own entitlements by email"
  ON public.entitlements FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce((auth.jwt() ->> 'email'), '')));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
