import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get("session");

  if (!session) {
    const url = new URL(request.url);
    url.pathname = "/session";
    return NextResponse.redirect(url);
  }

  const res = await prisma.music.findMany({
    where: {
      sessionId: session,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 3,
  });

  return NextResponse.json(res);
}
