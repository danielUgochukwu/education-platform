-- Ensure authenticated users can access applications through PostgREST.
-- RLS policies still enforce ownership via applicant_id = auth.uid().

grant usage on schema public to authenticated;

grant select, insert, update
on table public.applications
to authenticated;
