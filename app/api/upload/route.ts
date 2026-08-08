import { NextResponse } from "next/server";
import { saveShareRecord } from "@/lib/share-store";
import { crypto } from "next/dist/compiled/@edge-runtime/primitives";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a clean 8-character unique share ID
    const shareId = Math.random().toString(36).substring(2, 10);

    const record = await saveShareRecord(shareId, buffer);

    return NextResponse.json({
      shareId: record.shareId,
      imageUrl: record.imageUrl
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
