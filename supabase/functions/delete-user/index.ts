
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
    }

    const { user_id } = await req.json();
    if (!user_id) {
      return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400, headers: corsHeaders });
    }

    // First, delete from all user-linked tables (add your linked tables below)
    const tablesToDelete = [
      { table: "user_preferences", column: "user_id" },
      { table: "profiles", column: "id" },
      { table: "notifications", column: "user_id" },
      { table: "team_members", column: "user_id" }
      // Add more here as needed
    ];

    for (const { table, column } of tablesToDelete) {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(column, user_id);

      // Don't block delete on not found (deleting zero rows)
      if (error && error.code !== "PGRST116") {
        return new Response(JSON.stringify({
          error: `Failed to delete from ${table}: ${error.message}`
        }), { status: 500, headers: corsHeaders });
      }
    }

    // Optionally: Clean up any user-created projects/issues (not included here, best left to app logic or cascade deletes)

    // Then, delete the Supabase Auth account itself
    const { error: authError } = await supabase.auth.admin.deleteUser(user_id);
    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), { status: 500, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
});
