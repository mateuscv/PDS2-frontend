//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import { CButton } from "@coreui/react";
//Componets
import ShowVideos from "../components/showVideos";
import LogoutPage from "../components/logoutPage";
//Style
//API

const Library = ({ history, token }) => {
  const [state, setState] = useState({
    fetched: false,
  });
  const handleClick = () => {
    history.push("/playlist");
  };
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
    }
  }, []);
  return (
    <div>
      {token ? (
        <>
          <h1>Biblioteca</h1>
          <CButton onClick={() => handleClick()}>Playlist</CButton>
          <h4>Histórico</h4>
          <ShowVideos />
          <h4>Assistir mais tarde</h4>
          <ShowVideos />
          <h4>Playlists</h4>
          <ShowVideos />
          <h4>Vídeos marcados com "gostei"</h4>
          <ShowVideos />
        </>
      ) : (
        <LogoutPage />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Library);
