
-- 1. Add created_by to issues
ALTER TABLE public.issues ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.profiles(id);

-- 2. Add created_by to teams
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.profiles(id);

-- 3. (Optional) Backfill: If you want, assign existing issues/teams to users here
-- UPDATE public.issues SET created_by = ...;
-- UPDATE public.teams SET created_by = ...;

-- 4. Enable RLS on both tables if not already enabled
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing open policies (if present)
DROP POLICY IF EXISTS "Anyone can view issues" ON public.issues;
DROP POLICY IF EXISTS "Anyone can view teams" ON public.teams;
DROP POLICY IF EXISTS "Authenticated users can create issues" ON public.issues;
DROP POLICY IF EXISTS "Authenticated users can create teams" ON public.teams;

-- 6. Allow SELECT only for creator
CREATE POLICY "Users can view their own issues"
  ON public.issues
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can view their own teams"
  ON public.teams
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- 7. Allow INSERT only for own user id
CREATE POLICY "Users can create issues"
  ON public.issues
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can create teams"
  ON public.teams
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- 8. Allow UPDATE/DELETE only for creator (optional)
CREATE POLICY "Users can update their own issues"
  ON public.issues
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own issues"
  ON public.issues
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can update their own teams"
  ON public.teams
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own teams"
  ON public.teams
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());
