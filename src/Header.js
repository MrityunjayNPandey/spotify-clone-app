import { useState, useEffect } from "react";
import { Input } from "@mui/material";
import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useDataLayerValue } from "./DataLayer";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { getTokenFromUrl } from "./spotify";

const spotifyApi = new SpotifyWebApi({
  clientId: "7feed2ffa419451b853bd5dff8492ecb",
});
const spotify = new SpotifyWebApi();
function Header() {
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

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcRs0qwAs6M8N").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  }, []);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  console.log(searchResults);

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      //console.log(res.body.track.items);
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, token]);

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <Form.Control
          type="search"
          placeholder="Search for Artists, Songs, or Podcasts "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
