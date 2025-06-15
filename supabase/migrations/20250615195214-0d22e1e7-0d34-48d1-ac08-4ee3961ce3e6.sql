
-- 1. Add team_id to projects and issues (already run if present)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES public.teams(id);
ALTER TABLE public.issues ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES public.teams(id);

-- 2. Enable RLS on projects (if not already enabled)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Drop open policies if present
DROP POLICY IF EXISTS "Authenticated users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;

-- 4. Allow SELECT for creator or team members
CREATE POLICY "Users can view their own or team projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid()
    OR (
      team_id IS NOT NULL
      AND team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

-- 5. Allow INSERT if user is owner or team member
CREATE POLICY "Users can create own or team projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND (
      team_id IS NULL
      OR team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

-- 6. Allow UPDATE only for creator or team member
CREATE POLICY "Users can update their own or team projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR (
      team_id IS NOT NULL
      AND team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

-- 7. Allow DELETE only for creator or team member
CREATE POLICY "Users can delete their own or team projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR (
      team_id IS NOT NULL
      AND team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );


-- Repeat similar for issues

ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can create issues" ON public.issues;
DROP POLICY IF EXISTS "Anyone can view issues" ON public.issues;

CREATE POLICY "Users can view their own or team issues"
  ON public.issues
  FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid()
    OR (
      team_id IS NOT NULL
      AND team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

CREATE POLICY "Users can create own or team issues"
  ON public.issues
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND (
      team_id IS NULL
      OR team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

CREATE POLICY "Users can update their own or team issues"
  ON public.issues
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR (
      team_id IS NOT NULL
      AND team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

CREATE POLICY "Users can delete their own or team issues"
  ON public.issues
  FOR DELETE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR (
      team_id IS NOT NULL
      AND team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid() AND status = 'active'
      )
    )
  );

-- 8. (Optional) Backfill, set team_id for existing projects/issues if required
-- UPDATE public.projects SET team_id = ... WHERE ...;
-- UPDATE public.issues SET team_id = ... WHERE ...;
