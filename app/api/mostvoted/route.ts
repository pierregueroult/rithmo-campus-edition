import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get("session");
  const count = searchParams.get("count");

  if (!session) {
    const url = new URL(request.url);
    url.pathname = "/session";
    return NextResponse.redirect(url);
  }

  const res = await prisma.music.findMany({
    where: {
      sessionId: session,
    },
    include: {
      votes: true,
    },
    take: parseInt(count || "3"),
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
  });

  return NextResponse.json(res);
}
