export default async function getMusic(musicId: string, token: string) {
  var searchReqParams = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/tracks/${musicId}`,
    searchReqParams
  );

  const data = await response.json();

  return data;
}
