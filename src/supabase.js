import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vsggbqymgqsnpoqgoebw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZ2dicXltZ3FzbnBvcWdvZWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NjQ5NTYsImV4cCI6MjEwNTI0MDk1Nn0.3CqRgxjOKsIPf_e0YZ6iKLeh3zW33Ny-EzoU_srp8ds'

export const supabase = createClient(supabaseUrl, supabaseKey)