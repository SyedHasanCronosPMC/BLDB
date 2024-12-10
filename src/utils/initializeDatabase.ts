import { supabaseAdmin, initializeDatabaseSchema } from '../lib/supabaseAdmin';

export async function initializeDatabase(): Promise<boolean> {
  try {
    // Execute schema initialization using supabaseAdmin
    const success = await initializeDatabaseSchema();
    if (!success) {
      console.error('Database initialization failed');
      return false;
    }

    // Verify setup
    const { error: verifyError } = await supabaseAdmin
      .from('registrations')
      .select('id')
      .limit(1);
    
    if (verifyError) {
      console.error('Error verifying setup:', verifyError);
      return false;
    }

    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}