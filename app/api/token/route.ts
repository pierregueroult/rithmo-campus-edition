import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  var authParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
  };

  const authResponse = await fetch("https://accounts.spotify.com/api/token", {
    cache: "no-store",
    ...authParams,
  });

  const authData = await authResponse.json();
  const access_token = authData.access_token;

  return NextResponse.json({ access_token });
}
