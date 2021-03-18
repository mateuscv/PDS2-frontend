//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
//Componets
import PlaylistVideos from "../components/playlistVideos";
//Style
//API

const Playlist = ({ user, history }) => {
  const [state, setState] = useState({
    fetched: false,
  });
  useEffect(() => {
    if (!state.fetched) {
      if (!user) {
        alert(
          "Houve um problema",
          "Você não está logado para realizar essa ação por favor realize o login.",
          [
            {
              label: "Cancelar",
              onClick: () => {
                history.push("/home");
              },
            },
            {
              label: "Login",
              onClick: () => {
                history.push("/login");
              },
            },
          ]
        );
      }
      setState({ ...state, fetched: true });
    }
  }, [history, state, user]);
  return (
    <div>
      <PlaylistVideos/>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
