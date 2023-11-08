export type SpotifyTrack = {
  id: string;
  name: string;
  preview_url: string | undefined;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    images: {
      url: string;
    }[];
  };
};
