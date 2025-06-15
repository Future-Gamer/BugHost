
-- 1. Add created_by column
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.profiles(id);

-- 2. (Optional) If you have existing projects to update, do it here. Example:
-- UPDATE public.projects SET created_by = (SELECT id FROM public.profiles WHERE email = 'user@example.com') WHERE id = '...';

-- 3. Enable RLS if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 4. Drop overly permissive/select policies if present
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can create projects" ON public.projects;

-- 5. Only allow SELECT if user owns the project
CREATE POLICY "Users can view their own projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- 6. Only allow INSERT if the project is assigned to themselves
CREATE POLICY "Users can create projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- 7. Allow UPDATE/DELETE on own projects if you want (optional)
CREATE POLICY "Users can update their own projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());
