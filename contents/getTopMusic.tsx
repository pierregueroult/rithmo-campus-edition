import prisma from "../prisma/prisma";
import { Music } from "@prisma/client";

export default async function getTopMusic(
  sessionId: string
): Promise<Music | Error> {
  const music = await prisma.music.findFirst({
    where: {
      sessionId: sessionId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!music) {
    return Error();
  }
  return music;
}
