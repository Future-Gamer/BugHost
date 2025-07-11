-- Add RLS policy to allow team members to be deleted by team admins/managers
CREATE POLICY "Team admins and managers can delete team members" 
ON public.team_members 
FOR DELETE 
USING (
  -- Allow deletion if the user is an admin or manager in the same team
  EXISTS (
    SELECT 1 
    FROM team_members tm 
    WHERE tm.team_id = team_members.team_id 
      AND tm.user_id = auth.uid() 
      AND tm.status = 'active'
      AND tm.role IN ('admin', 'manager')
  )
);