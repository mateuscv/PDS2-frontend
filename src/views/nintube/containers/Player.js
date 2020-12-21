//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CButton,
  CDropdown,
  CCard,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
import "../styles/nintube.css";
//API
import ReactPlayer from "react-player";
import { useWindowSize } from "@react-hook/window-size/throttled";

const Player = () => {
  const [window_width, window_height] = useWindowSize({ fps: 60 });
  const [state, setState] = useState({
    fetched: false,
    volume: 0.5,
    playing: false,
    playbackRate: 1.0,
    muted: false,
  });

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleVolumeChange = (value) => {
    setState({
      ...state,
      volume: value ? value : state.volume,
      muted: value ? false : true,
    });
  };

  const handleSetPlaybackRate = (e) => {
    setState({ ...state, playbackRate: parseFloat(e.target.value) });
  };

  useEffect(() => {
    // var size = useWindowSize();
    if (!state.fetched) {
      setState({ ...state, fetched: true });
    }
  }, []);

  return (
    <div
      style={{ width: "fit-content", height: "fit-content", marginLeft: "3%" }}
    >
      <div
        style={{
          cursor: "pointer",
          //border: "3px solid red",
        }}
        onClick={() => handlePlayPause()}
      >
        <ReactPlayer
          style={{}}
          // url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
          url="	https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
          //url="https://youtube-videos-furg.s3.amazonaws.com/SampleVideo_1280x720_1mb.mp4"

          width="860px"
          height="420px"
          // width={window_width - 1000}
          // height={window_height - 500}
          muted={state.muted}
          playing={state.playing}
          volume={state.volume}
          playbackRate={state.playbackRate}
        />
      </div>

      <div
        style={{
          border: "1px solid black",
          display: "flex",
          //backgroundColor: "rgb(38, 36, 82)",
        }}
      >
        {" "}
        <div
          onClick={() => handlePlayPause()}
          style={{
            //padding: "7px",
            //marginLeft: "1%",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "1%",
            //backgroundColor: "red",
            //border: "1px inset black",
            width: "6%",
            height: "35px",
            //color: "white",
          }}
        >
          {state.playing ? (
            <CIcon name="cilMediaPause" />
          ) : (
            <CIcon name="cilMediaPlay" />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //color: "white",
          }}
        >
          {state.muted === true ? (
            <CIcon
              name="cilVolumeOff"
              onClick={() => handleVolumeChange(state.volume)}
            />
          ) : null}
          {state.muted === false && state.volume <= 0.5 ? (
            <CIcon name="cilVolumeLow" onClick={() => handleVolumeChange(0)} />
          ) : null}
          {state.muted === false && state.volume > 0.5 ? (
            <CIcon name="cilVolumeHigh" onClick={() => handleVolumeChange(0)} />
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <input
            style={{ width: "50%", marginLeft: "1%" }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={state.volume}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //color: "white",
          }}
        >
          Velocidade
          <CSelect onChange={(e) => handleSetPlaybackRate(e)}>
            <option value="0.25">0.25</option>
            <option value="0.5">0.5</option>
            <option value="0.75">0.75</option>
            <option value="1" selected>
              1
            </option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
          </CSelect>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Player);
