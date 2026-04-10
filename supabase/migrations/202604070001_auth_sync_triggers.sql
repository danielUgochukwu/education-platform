-- Migration: Create Auth Sync Triggers for Students and Admin Users
-- Description: Automatically propagates new Supabase auth.users into the appropriate table

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    IF new.raw_user_meta_data->>'role' = 'student' THEN
        INSERT INTO public.students (
            id, 
            email, 
            first_name, 
            last_name, 
            phone, 
            state, 
            country, 
            status
        )
        VALUES (
            new.id,
            new.email,
            new.raw_user_meta_data->>'first_name',
            new.raw_user_meta_data->>'last_name',
            new.raw_user_meta_data->>'phone',
            new.raw_user_meta_data->>'state',
            new.raw_user_meta_data->>'country',
            COALESCE(new.raw_user_meta_data->>'status', 'pending')
        );
    ELSE
        INSERT INTO public.admin_users (
            id, 
            email, 
            name, 
            role, 
            permissions
        )
        VALUES (
            new.id,
            new.email,
            new.raw_user_meta_data->>'name',
            new.raw_user_meta_data->>'role',
            COALESCE(new.raw_user_meta_data->'permissions', '{"can_review": false, "can_approve": false, "can_manage_funds": false}'::jsonb)
        );
    END IF;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
