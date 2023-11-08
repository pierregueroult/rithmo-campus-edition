import getMusic from "@/contents/getMusic";
import prisma from "@/prisma/prisma";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import { redirect } from "next/navigation";

type MusicVoteProps = {
  params: {
    slugs: string[];
  };
};

async function registerVote(
  musicId: string | null,
  token: string | null,
  session: string | null,
  emoji: string | null
) {
  if (!musicId || !token || !session) {
    throw new Error("Missing parameters");
  }
  var data = await getMusic(musicId, token);
  if (!data) {
    throw new Error("Music not found");
  }
  var count = await prisma.music.count({
    where: { spotifyId: musicId, sessionId: session },
  });
  if (count === 0) {
    if (emoji === null) {
      throw new Error("Missing parameters");
    }
    var write = await prisma.music.create({
      data: {
        spotifyId: musicId,
        title: data.name,
        artist: data.artists
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        imageCover: data.album.images[0].url,
        previewUrl: data.preview_url ? data.preview_url : "",
        count: 1,
        sessionId: session,
        emoji: emoji,
      },
    });
    await prisma.vote.create({
      data: {
        musicId: write.id,
      },
    });
  } else {
    var write = await prisma.music.update({
      where: { spotifyId: musicId, sessionId: session },
      data: { count: { increment: 1 } },
    });
    await prisma.vote.create({
      data: {
        musicId: write.id,
      },
    });
  }
  return write;
}

export default async function MusicVote({ params }: MusicVoteProps) {
  const { slugs } = params;
  const response = await registerVote(
    slugs[0] ? slugs[0] : null,
    slugs[1] ? slugs[1] : null,
    slugs[2] ? slugs[2] : null,
    slugs[3] ? slugs[3] : null
  );

  if (response) {
    redirect(`/votes/${slugs[0]}`);
  } else {
    return <p>Chargement ...</p>;
  }
}
