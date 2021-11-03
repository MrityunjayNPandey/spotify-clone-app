import { Input } from "@mui/material";
import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>

      <div className="header__right">
        <h4>joKer</h4>
        <Avatar src="" alt="JH" />
      </div>
    </div>
  );
}

export default Header;
