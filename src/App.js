import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();
  const [songs] = useState([
    {
      title: "Titaliya",
      artist: "Hardy Sandhu",
      img_src: "./images/titaliya.jpg",
      src: "./music/Titliaan Warga.mp3",
    },
    {
      title: "Nach Meri Rani",
      artist: "Yo Yo Honey Singh",
      img_src: "./images/nach-meri-rani.jpg",
      src: "./music/Naach Meri Rani.mp3",
    },
    {
      title: "Care Ni Karda",
      artist: "Yo Yo Honey Singh",
      img_src: "./images/care-ni-karda.jpg",
      src: "./music/Care Ni Karda.mp3",
    },
    {
      title: "Burj Khalifa",
      artist: "Shashi",
      img_src: "./images/burjkalifa.jpg",
      src: "./music/BurjKhalifa.mp3",
    },
    {
      title: "Tango Del Fuego",
      artist: "Parov Stelar",
      img_src: "./images/ParovStelarGeorgiaGibbs-TangoDelFuego.jpg",
      src: "./music/ParovStelarGeorgiaGibbs-TangoDelFuego.mp3",
    },
    {
      title: "Take You Dancing",
      artist: "Jason Derulo",
      img_src: "./images/JasonDerulo-TakeYouDancing.jpg",
      src: "./music/JasonDerulo-TakeYouDancing.mp3",
    },
    {
      title: "Daisy",
      artist: "Ashnikko",
      img_src: "./images/Ashnikko-Daisy.jpg",
      src: "./music/Ashnikko-Daisy.mp3",
    },
    {
      title: "Dolly Song",
      artist: "Partz Grimbad",
      img_src: "./images/PatzGrimbard-DollySong.jpg",
      src: "./music/PatzGrimbard-DollySong.mp3",
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

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

  return (
    <div className="app">
      {token ? (
        <Player
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
          spotify={spotify}
        />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
