import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(request: Request) {
  const emojisPath = path.join(process.cwd(), "public", "emojis");

  const emojis = fs.readdirSync(emojisPath);

  const randomEmojis = emojis
    .sort(() => Math.random() - Math.random())
    .slice(0, 7);

  return NextResponse.json(randomEmojis);
}
