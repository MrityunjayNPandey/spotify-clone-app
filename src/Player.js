import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import { useState, useRef, useEffect } from "react";
import { shuffle } from "lodash";

function Player(props, { spotify }) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  var duration = audioEl.duration;
  var currentTime = audioEl.currentTime;
  var percentage = currentTime / duration;
  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  const ShuffleSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp += Math.floor(Math.random() * 4);

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    }
  };

  return (
    <div className="player">
      <div className="player_body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
        ShuffleSong={ShuffleSong}
        song={props.songs[props.currentSongIndex]}
        spotify={spotify}
      />
      <audio
        className="c-player--audio"
        src={props.songs[props.currentSongIndex].src}
        ref={audioEl}
        footer
      ></audio>
    </div>
  );
}

export default Player;
