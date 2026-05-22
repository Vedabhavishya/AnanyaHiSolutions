import { promises as fs } from "fs";
import path from "path";

// Return database absolute path
export function getDbPath() {
  return path.join(process.cwd(), "src", "data", "db.json");
}

// Read whole DB
export async function readDb() {
  try {
    const filePath = getDbPath();
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { services: [], jobs: [], blogs: [] };
  }
}

// Write whole DB
export async function writeDb(data) {
  try {
    const filePath = getDbPath();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing database:", error);
    return false;
  }
}

// Simple token validation helper
export function verifyToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;
  
  const token = authHeader.replace("Bearer ", "");
  return token === "ananya-secure-admin-token-2026";
}
