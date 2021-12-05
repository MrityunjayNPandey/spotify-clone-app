import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node";
import { useDataLayerValue } from "./DataLayer";
import { getTokenFromUrl } from "./spotify";

const spotifyApi = new SpotifyWebApi({
  clientId: "7feed2ffa419451b853bd5dff8492ecb",
});
const spotify = new SpotifyWebApi();

export default function Player({ trackUri }) {
  const [play, setPlay] = useState(false);

  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);
    }
  }, []);

  useEffect(() => setPlay(true), [trackUri]);

  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      // next=
      uris={trackUri ? [trackUri] : []}
    />
  );
}
