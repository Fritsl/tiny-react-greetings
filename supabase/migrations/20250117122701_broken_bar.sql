/*
  # Fix page completion table constraints

  1. Changes
    - Drop and recreate page_completion table with correct constraints
    - Add proper indexes for performance
    - Update RLS policies

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing table
DROP TABLE IF EXISTS page_completion;

-- Create page completion table with correct structure
CREATE TABLE page_completion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  page_id text NOT NULL,
  is_completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint for user_id and page_id combination
ALTER TABLE page_completion 
  ADD CONSTRAINT page_completion_user_page_key 
  UNIQUE (user_id, page_id);

-- Add index for faster queries
CREATE INDEX page_completion_user_id_idx ON page_completion(user_id);
CREATE INDEX page_completion_page_id_idx ON page_completion(page_id);

-- Enable RLS
ALTER TABLE page_completion ENABLE ROW LEVEL SECURITY;

-- Policies for page_completion
CREATE POLICY "Users can read own page completion"
  ON page_completion
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own page completion"
  ON page_completion
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own page completion"
  ON page_completion
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);