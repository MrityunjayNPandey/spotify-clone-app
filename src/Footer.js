import React from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Grid, Slider } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__left">
        <img className="footer__albumLogo" src={props.song.img_src} alt="" />
        <div className="footer__songInfo">
          <h4>{props.song.title}</h4>
          <p>{props.song.artist}</p>
        </div>
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        {/* <SkipPreviousIcon className="footer__icon" /> */}
        <IconButton onClick={() => props.SkipSong(false)}>
          <SkipPreviousIcon className="footer__icon" />
        </IconButton>

        {/* <PlayCircleOutlineIcon fontSize="large" className="footer__icon" /> */}

        <IconButton
          className="footer__icon"
          onClick={() => props.setIsPlaying(!props.isPlaying)}
        >
          {props.isPlaying ? (
            <PauseCircleOutlineIcon className="footer__icon" fontSize="large" />
          ) : (
            <PlayCircleOutlineIcon className="footer__icon" fontSize="large" />
          )}
        </IconButton>

        <IconButton onClick={() => props.SkipSong()}>
          <SkipNextIcon className="footer__icon" />
        </IconButton>

        {/* <SkipNextIcon className="footer__icon" /> */}
        <RepeatIcon className="footer__green" />
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
