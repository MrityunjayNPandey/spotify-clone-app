import React from "react";
import "./TrackSearchResult.css";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      className="trackSearchResult"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        className="trackSearchResult__album"
        src={track.albumUrl}
        alt=""
      />
      <div className="trackSearchResult__info">
        <h1>{track.title}</h1>
        <p>{track.artist}</p>
      </div>
    </div>
  );
}
