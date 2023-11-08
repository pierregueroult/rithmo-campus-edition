import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const token = searchParams.get("token");

  var searchReqParams = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&offset=0&limit=5&market=FR`,
    searchReqParams
  );

  const searchData = await searchResponse.json();

  return NextResponse.json(searchData);
}
