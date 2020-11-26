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
  });

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleVolumeChange = (e) => {
    setState({ ...state, volume: parseFloat(e.target.value) });
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
        // url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
        playing={state.playing}
        url="https://www.youtube.com/embed/kva7qYw679E"
        volume={state.volume}
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
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(View);
