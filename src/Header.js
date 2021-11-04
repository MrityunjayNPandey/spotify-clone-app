import { useState } from "react";
import { Input } from "@mui/material";
import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useDataLayerValue } from "./DataLayer";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

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
