import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get("session");
  const spotifyId = searchParams.get("id");
  if (!session || !spotifyId) return NextResponse.error();

  var data = await prisma.music.findUnique({
    where: {
      sessionId: session,
      spotifyId: spotifyId,
    },
  });

  if (!data) return NextResponse.json({ error: "No data found" });

  return NextResponse.json(data);
}
