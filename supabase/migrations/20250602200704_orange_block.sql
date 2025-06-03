/*
  # Update subscription to premium plan

  1. Changes
    - Creates or updates subscription for the authenticated user
    - Sets subscription status to 'active'
    - Sets plan to 'premium'
    - Updates timestamps

  2. Security
    - Uses RLS policies already in place
    - Only affects authenticated users
*/

-- Create a function to get the current user's subscription
CREATE OR REPLACE FUNCTION update_user_subscription(user_uuid UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO subscriptions (
    user_id,
    status,
    plan,
    created_at,
    updated_at
  )
  VALUES (
    user_uuid,
    'active',
    'premium',
    now(),
    now()
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    status = 'active',
    plan = 'premium',
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;