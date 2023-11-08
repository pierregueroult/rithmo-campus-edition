import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  var searchReqParams = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const musicResponse = await fetch(
    `https://api.spotify.com/v1/tracks/${id}`,
    searchReqParams
  );

  const musicData = await musicResponse.json();

  return NextResponse.json(musicData);
}
