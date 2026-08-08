import fs from "node:fs";
import path from "node:path";

export interface ShareRecord {
  shareId: string;
  imageUrl: string;
  createdAt: number;
  builderName?: string;
  builderTitle?: string;
}

// In-memory cache for fast lookup during server lifetime
const memoryStore = new Map<string, ShareRecord>();

// Fallback disk directory for persistent share records in dev environment
const DATA_DIR = path.join(process.cwd(), "public", "uploads");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export async function saveShareRecord(
  shareId: string,
  imageBuffer: Buffer,
  meta?: { builderName?: string; builderTitle?: string }
): Promise<ShareRecord> {
  ensureDataDir();

  const fileName = `${shareId}.png`;
  const filePath = path.join(DATA_DIR, fileName);
  await fs.promises.writeFile(filePath, imageBuffer);

  const imageUrl = `/uploads/${fileName}`;
  const record: ShareRecord = {
    shareId,
    imageUrl,
    createdAt: Date.now(),
    ...meta
  };

  memoryStore.set(shareId, record);
  return record;
}

export async function getShareRecord(shareId: string): Promise<ShareRecord | null> {
  if (memoryStore.has(shareId)) {
    return memoryStore.get(shareId)!;
  }

  ensureDataDir();
  const filePath = path.join(DATA_DIR, `${shareId}.png`);

  if (fs.existsSync(filePath)) {
    const record: ShareRecord = {
      shareId,
      imageUrl: `/uploads/${shareId}.png`,
      createdAt: Date.now()
    };
    memoryStore.set(shareId, record);
    return record;
  }

  return null;
}
