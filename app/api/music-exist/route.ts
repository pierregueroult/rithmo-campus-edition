import { NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.next();
  }

  const data = await prisma.music.findUnique({
    where: {
      spotifyId: id,
    },
    select: {
      count: true,
    },
  });

  if (!data) {
    return NextResponse.json({
      exists: false,
      count: 0,
    });
  }

  return NextResponse.json({
    exists: true,
    count: data.count,
  });
}
