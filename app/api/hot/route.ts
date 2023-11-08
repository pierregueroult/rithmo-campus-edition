import prisma from "@/prisma/prisma";
import { Music } from "@prisma/client";
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
    take: 30,
  });

  // todo calculate most hot by dividing votes by time

  // calculate average timestamp vote for each trcks

  var averageTimestamps: Array<{
    track: any;
    averageTimestamp: number;
  }> = [];

  res.forEach((element, i: number) => {
    var averageTimestamp = 0;
    element.votes.forEach((vote) => {
      averageTimestamp += vote.createdAt.getTime();
    });
    averageTimestamps[i] = {
      track: element,
      averageTimestamp: averageTimestamp / element.votes.length,
    };
  });

  return NextResponse.json(
    averageTimestamps.map((e) => e.track).slice(0, Number(count) || 3)
  );
}
