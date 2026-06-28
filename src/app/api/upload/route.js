import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyToken } from "../db-helper";

export async function POST(request) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists in public
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique filename with timestamp prefix
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${sanitizedName}`;
    const filePath = path.join(uploadDir, filename);

    // Save file locally
    await fs.writeFile(filePath, buffer);

    const relativePath = `/images/uploads/${filename}`;
    return NextResponse.json({ success: true, url: relativePath });
  } catch (error) {
    console.error("Local file upload failed:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
