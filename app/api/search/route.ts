import { NextResponse } from "next/server";
import type { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const token = searchParams.get("token");

  var searchReqParams: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  };

  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&offset=0&limit=5&market=FR`,
    searchReqParams
  );

  const searchData = await searchResponse.json();

  return NextResponse.json(searchData);
}
