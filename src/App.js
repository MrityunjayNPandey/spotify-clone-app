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
      title: "Levitating",
      artist: "Dua Lipa",
      img_src:
        "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png",
      src: "https://mymp3bhojpuri.in/files/download/type/128/id/17928",
    },
    {
      title: "Build a Bitch",
      artist: "Bella Poarch",
      img_src:
        "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/24/39/dc/2439dc3f-389e-3412-148f-7afb2c4296e9/054391922588.jpg/500x500bb.webp",
      src: "https://www.pagolworld.in/files/download/id/6511",
    },
    {
      title: "Dinero",
      artist: "Trinidad Cardona",
      img_src:
        "https://i2.wp.com/www1.naijaforbe.com/wp-content/uploads/2021/09/1-2107.jpg?w=662&ssl=1",
      src: "https://pagalaworld.in/files/download/type/128/id/30293",
    },
    {
      title: "Indian Summer",
      artist: "Shuba",
      img_src:
        "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/21/bd/c2/21bdc287-6c9e-abb7-0030-958cbcd16e6a/196193418378.png/400x400cc.jpg",
      src: "https://mp3.lyricstuff.com/wp-content/uploads/2021/07/Shuba.mp3",
    },
    {
      title: "Save Your Tears",
      artist: "The Weeknd",
      img_src:
        "https://images.hungama.com/c/1/7c2/e71/52624052/52624052_300x300.jpg",
      src: "https://lekkiloaded.com/wp-content/uploads/2021/02/The_Weekend_-_Save_Your_Tears-(LekkiLoaded.com).mp3",
    },
    {
      title: "Hold On",
      artist: "Justin Bieber",
      img_src:
        "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
      src: "https://pagalworld.com.se/files/download/type/128/id/1383",
    },
    {
      title: "Summer of Love (Shawn Mendes & Tainy)",
      artist: "Shawn Mendes",
      img_src:
        "https://i.scdn.co/image/ab67616d0000b273a111c87c210cc9bff93948bd",
      src: "https://mymp3bhojpuri.in/files/download/type/128/id/31580",
    },
    {
      title: "Kiss Me More",
      artist: "Doja Cat",
      img_src: "https://fun2desi.me/siteuploads/thumb/sft109/54315_5.jpg",
      src: "https://fun2desi.me/files/download/id/54315/type/128",
    },
    {
      title: "Sketchers",
      artist: "Dripreport & Carbine",
      img_src:
        "https://a10.gaanacdn.com/images/albums/13/3089713/crop_480x480_3089713.jpg",
      src: "https://paglasongs.com/files/download/type/128/id/838",
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
