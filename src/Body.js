import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./DataLayer";
import { useState, useEffect } from "react";
import FooterPlayer from "./FooterPlayer";
import {
  Favorite,
  More,
  MoreHoriz,
  PlayCircleFilled,
} from "@mui/icons-material";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  var [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  return (
    <div className="body">
      <Header spotify={spotify} />
      {/* <FooterPlayer trackUri={playingTrack?.uri} /> */}
      <div id="fadeshow12" className="body__info">
        <img id="fadeshow1" src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilled className="body__shuffle" />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow
            track={item.track}
            key={item.track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
