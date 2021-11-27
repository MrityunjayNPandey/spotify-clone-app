import React from "react";
import "./Footer.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Grid, Slider } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";

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
        <SkipPreviousIcon
          className="footer__icon"
          onClick={() => props.SkipSong(false)}
        />
        {props.isPlaying ? (
          <PauseCircleFilledIcon
            className="footer__icon"
            fontSize="large"
            onClick={() => props.setIsPlaying(!props.isPlaying)}
          />
        ) : (
          <PlayCircleFilledIcon
            className="footer__icon"
            fontSize="large"
            onClick={() => props.setIsPlaying(!props.isPlaying)}
          />
        )}

        <SkipNextIcon
          className="footer__icon"
          onClick={() => props.SkipSong()}
        />
        <RepeatIcon className="footer__green"
        onClick={() => props.ShuffleSong()} />
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
