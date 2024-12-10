import { supabase } from '../lib/supabase';

interface ColumnDefinition {
  name: string;
  type: string;
  constraints: string[];
}

const SCHEMA_DEFINITION: ColumnDefinition[] = [
  { name: 'id', type: 'uuid', constraints: ['PRIMARY KEY'] },
  { name: 'first_name', type: 'text', constraints: ['NOT NULL'] },
  { name: 'last_name', type: 'text', constraints: ['NOT NULL'] },
  { name: 'email', type: 'text', constraints: ['NOT NULL', 'UNIQUE'] },
  { name: 'phone', type: 'text', constraints: ['NOT NULL'] },
  { name: 'country_code', type: 'text', constraints: ['NOT NULL'] },
  { name: 'linkedin_profile', type: 'text', constraints: ['NOT NULL'] },
  { name: 'educational_background', type: 'text', constraints: ['NOT NULL'] },
  { name: 'current_position', type: 'text', constraints: ['NOT NULL'] },
  { name: 'work_experience', type: 'text', constraints: ['NOT NULL'] },
  { name: 'interest_areas', type: 'jsonb', constraints: ['NOT NULL', 'DEFAULT \'[]\''] },
  { name: 'location_address', type: 'text', constraints: ['NOT NULL'] },
  { name: 'location_lat', type: 'double precision', constraints: ['NOT NULL'] },
  { name: 'location_lng', type: 'double precision', constraints: ['NOT NULL'] },
  { name: 'profile_photo_url', type: 'text', constraints: [] },
  { 
    name: 'created_at', 
    type: 'timestamp with time zone', 
    constraints: ['NOT NULL', 'DEFAULT TIMEZONE(\'utc\'::text, NOW())'] 
  },
  { 
    name: 'updated_at', 
    type: 'timestamp with time zone', 
    constraints: ['NOT NULL', 'DEFAULT TIMEZONE(\'utc\'::text, NOW())'] 
  }
];

export async function validateDatabaseSchema(): Promise<boolean> {
  try {
    // Check if table exists
    const { data: tableExists, error: tableError } = await supabase
      .from('registrations')
      .select('id')
      .limit(1);

    if (tableError) {
      console.error('Error checking table:', tableError);
      return false;
    }

    // Get column information
    const { data: columns, error: columnError } = await supabase.rpc('get_column_info', {
      table_name: 'registrations'
    });

    if (columnError) {
      console.error('Error getting column info:', columnError);
      return false;
    }

    // Validate each column
    for (const definition of SCHEMA_DEFINITION) {
      const column = columns?.find((col: any) => col.column_name === definition.name);
      
      if (!column) {
        console.error(`Missing column: ${definition.name}`);
        return false;
      }

      if (column.data_type !== definition.type) {
        console.error(`Invalid type for ${definition.name}: expected ${definition.type}, got ${column.data_type}`);
        return false;
      }

      // Check constraints
      for (const constraint of definition.constraints) {
        if (!column.constraints?.includes(constraint)) {
          console.error(`Missing constraint for ${definition.name}: ${constraint}`);
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Schema validation error:', error);
    return false;
  }
}

export async function ensureCorrectSchema(): Promise<void> {
  try {
    const isValid = await validateDatabaseSchema();
    if (!isValid) {
      console.error('Database schema validation failed. Please ensure the correct table structure exists.');
      
      // Log the correct schema creation SQL
      console.info('Use the following SQL to create the correct table structure:');
      console.info(`
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  country_code TEXT NOT NULL,
  linkedin_profile TEXT NOT NULL,
  educational_background TEXT NOT NULL,
  current_position TEXT NOT NULL,
  work_experience TEXT NOT NULL,
  interest_areas JSONB NOT NULL DEFAULT '[]',
  location_address TEXT NOT NULL,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_country_code ON registrations(country_code);
CREATE INDEX idx_registrations_created_at ON registrations(created_at);
      `);
    }
  } catch (error) {
    console.error('Error ensuring correct schema:', error);
  }
}

// Function to create the get_column_info stored procedure
export async function createColumnInfoFunction(): Promise<void> {
  const { error } = await supabase.rpc('create_column_info_function', {
    sql: `
      CREATE OR REPLACE FUNCTION get_column_info(table_name text)
      RETURNS TABLE (
        column_name text,
        data_type text,
        constraints text[]
      ) AS $$
      BEGIN
        RETURN QUERY
        SELECT
          c.column_name::text,
          c.data_type::text,
          array_agg(DISTINCT CASE
            WHEN c.is_nullable = 'NO' THEN 'NOT NULL'
            WHEN c.column_default IS NOT NULL THEN 'DEFAULT ' || c.column_default
            WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PRIMARY KEY'
            WHEN tc.constraint_type = 'UNIQUE' THEN 'UNIQUE'
            ELSE NULL
          END)::text[] AS constraints
        FROM information_schema.columns c
        LEFT JOIN information_schema.constraint_column_usage ccu
          ON c.table_name = ccu.table_name
          AND c.column_name = ccu.column_name
        LEFT JOIN information_schema.table_constraints tc
          ON ccu.constraint_name = tc.constraint_name
        WHERE c.table_name = $1
        GROUP BY c.column_name, c.data_type;
      END;
      $$ LANGUAGE plpgsql;
    `
  });

  if (error) {
    console.error('Error creating column info function:', error);
  }
}