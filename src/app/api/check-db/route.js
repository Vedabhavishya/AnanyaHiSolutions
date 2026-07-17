import { NextResponse } from "next/server";
import { readDb, writeDb } from "../db-helper";
import { createClient } from "@libsql/client";

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const status = {
    turso: {
      url_configured: !!tursoUrl,
      token_configured: !!tursoToken,
      url_sample: tursoUrl ? tursoUrl.replace(/^["']|["']$/g, "").substring(0, 15) + "..." : null,
    },
    supabase: {
      url_configured: !!supabaseUrl,
      key_configured: !!supabaseKey,
    }
  };

  try {
    const db = await readDb();
    status.db_read_success = true;
    status.db_keys = Object.keys(db);
    
    // Perform a test write with the read database object
    try {
      const writeResult = await writeDb(db);
      status.db_write_success = writeResult;
      if (!writeResult) {
        status.db_write_error = "writeDb returned false without throwing";
      }
    } catch (writeErr) {
      status.db_write_success = false;
      status.db_write_error = writeErr.message;
      status.db_write_error_stack = writeErr.stack;
    }
  } catch (error) {
    status.db_read_success = false;
    status.db_read_error = error.message;
  }

  // Let's also test direct client write to see if it throws there
  if (tursoUrl && tursoToken) {
    try {
      const cleanUrl = tursoUrl.replace(/^["']|["']$/g, "");
      const cleanToken = tursoToken.replace(/^["']|["']$/g, "");
      const client = createClient({ url: cleanUrl, authToken: cleanToken });
      
      const testRes = await client.execute("SELECT 1");
      status.direct_client_select_success = true;
      
      try {
        await client.execute({
          sql: "INSERT OR REPLACE INTO site_data (key, value) VALUES (?, ?)",
          args: ["db_root_test", JSON.stringify({ test: true })]
        });
        status.direct_client_insert_success = true;
      } catch (insertErr) {
        status.direct_client_insert_success = false;
        status.direct_client_insert_error = insertErr.message;
      }
    } catch (clientErr) {
      status.direct_client_success = false;
      status.direct_client_error = clientErr.message;
    }
  }

  return NextResponse.json(status);
}
