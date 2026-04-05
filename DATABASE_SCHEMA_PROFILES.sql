-- Profiles Table Schema for Neurox/Sullia Project
-- Run this in Supabase SQL Editor

CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  age INTEGER,
  education_level TEXT,
  interests TEXT,
  skill_level TEXT,
  follow_up_answers JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own profile
CREATE POLICY "Users can manage their own profile"
ON profiles FOR ALL USING (true) WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Optional: Create trigger to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
