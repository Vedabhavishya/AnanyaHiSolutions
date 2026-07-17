import { NextResponse } from "next/server";
import { readDb } from "../db-helper";

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
  } catch (error) {
    status.db_read_success = false;
    status.db_read_error = error.message;
  }

  return NextResponse.json(status);
}
