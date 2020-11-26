//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import { CButton, CInput } from "@coreui/react";
//Componets
//Style
//API
import Dropzone from "react-dropzone";
import ReactPlayer from "react-player";

const View = ({ token }) => {
  const [state, setState] = useState({
    fetched: false,
    volume: 0.5,
    playing: false,
    playbackRate: 1.0,
  });

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleVolumeChange = (e) => {
    setState({ ...state, volume: parseFloat(e.target.value) });
  };

  const handleSetPlaybackRate = (e) => {
    setState({ ...state, playbackRate: parseFloat(e.target.value) });
  };

  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
    }
  }, []);
  return (
    <div>
      <h1>View</h1>
      <ReactPlayer
        style={{ cursor: "pointer" }}
        onClick={() => handlePlayPause()}
        // url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
        playing={state.playing}
        url="	https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        volume={state.volume}
        playbackRate={state.playbackRate}
      />
      <CButton onClick={() => handlePlayPause()}>
        {state.playing ? "Pause" : "Play"}
      </CButton>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={state.volume}
        onChange={(e) => handleVolumeChange(e)}
      />
      <button onClick={(e) => handleSetPlaybackRate(e)} value={0.25}>
        0.25x
      </button>
      <button onClick={(e) => handleSetPlaybackRate(e)} value={0.5}>
        0.5x
      </button>
      <button onClick={(e) => handleSetPlaybackRate(e)} value={1}>
        1x
      </button>
      <button onClick={(e) => handleSetPlaybackRate(e)} value={1.5}>
        1.5x
      </button>
      <button onClick={(e) => handleSetPlaybackRate(e)} value={1.75}>
        1.75x
      </button>
      <button onClick={(e) => handleSetPlaybackRate(e)} value={2}>
        2x
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(View);
