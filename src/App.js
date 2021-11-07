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
      title: "Step On Up",
      artist: "Ariana Grande",
      img_src:
        "https://i.scdn.co/image/ab67616d0000b2732e651648db439a9b5995e065",
      src: "https://dl256.dlmate09.xyz/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1rRVJIOGhPY2hpSjRWeVZzV0VlVkJ0dDVwMGUyc0p2WmZMN01Ia00vd044ZGI0Q3JOYzlYT1lpbUVwc3RqRUZXQXNvUWJvRzNDOHBvbEY4cCtXMTIxMFBXM2t5RkpoZ25LYThqeU80SlBaM3gzZ0UxaXdDM2R3ZUdIL3hMOXZDQ0VpUXVHZERRRG9ENGZOUGpWck00ZWhqK1pQcUN3aThCRHZqREM1cGdS",
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
      title: "What a Shame",
      artist: "Leyla Blue",
      img_src:
        "https://i.scdn.co/image/ab67616d0000b273b8ccef77aa3a5833f2c2785b",
      src: "https://dl90.dlmate49.xyz/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1rRVJIOGdQc2xqSjRiakNNckFLWko2SUEvaEtLbUtzVktFYmNPMllML1ZJeHk3REhOWmNXSk5VcmJrSlUyRVRiVDBkZDQ2eG5Xb1lNaFRjdy9WUm4xMEt2b2dUbDNuVGowUWN2RkZMVlRVbFZJaEJCNWd3aUF3K0dBOXhqbzREdXFva0xlUlFwTXR5TWJOT2ZWNVpaRjBEU2FPYVN5Z2NGUy9IN0xwSWxmaC9TZjRBPT0%3D",
    },
    {
      title: "Promiscuous Motive",
      artist: "Josiane Lessard",
      img_src:
        "https://i.scdn.co/image/ab67616d0000b273fc4d4176928a0b91a2588755",
      src: "https://ccii.bcbbecbddebaafe.xyz/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1rRVJIOGx1RXRtZHM3akRjeEFLVklvOFkzbk1xbEw4VldaWUVhMzU2akZkRWZ2ZzdLZnQyQ0l3eWN1WTAxQ1Y2TzQ5OHJ2SFRKOW84MEV1MStYQmV6dU9lMzNSeDNtZy9nYnBiQUJlc1FhMzUzcG45ejBqS2JrYlNHbnd6M3BtbTRwVWpHUGdJSG9taE9iOU9DdE0xdXpEdkdidVBoblpNS29HM1NxWnRiMC9HVHRUN3gwYk13dk5sS1JudDZkcHhSd0tYenl1TFlwRU1XdjRrTzFVQ3R1dUd6Q1lzbUk2aVJiVDVtT3gwUDdPNzdZeDhSeFNRaCsyMnF5YUlrL1dnY1laOXp3R2VRek1qOE5UNjNSNHo3WDhMQ0xlMnkrK3pYcFB4NXIwalRvL2ZPa1o4ZHgxNzBIcHF1RVlKWjZRa3d0LzZINTVrPQ%3D%3D",
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
