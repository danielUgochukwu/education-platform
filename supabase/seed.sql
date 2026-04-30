-- Seed script for setting up initial Platform state
-- Since Supabase auth handles password hashing, the best way to seed an admin is:
-- 1. Start your local dev server and sign up normally via the UI with your admin email.
-- 2. Run this SQL command in your Supabase SQL editor to elevate that new user to an 'admin' role.

-- Replace 'your_email@example.com' with the email you signed up with.
UPDATE public.profiles
SET role = 'admin',
    account_type = 'admin'
WHERE email = 'your_email@example.com';

-- You can also insert standard programs or initial data here if desired.
-- Example:
/*
INSERT INTO public.programs (id, name, description)
VALUES 
  (gen_random_uuid(), 'Pioneer Engineering Cohort', 'First batch of the engineering track.'),
  (gen_random_uuid(), 'Technology Infrastructure', 'Advanced computing and networking track.')
ON CONFLICT DO NOTHING;
*/
