//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
//Componets
import ShowVideos from "../components/showVideos";
import LogoutPage from "../components/logoutPage";
//Style
//API

const Inscriptions = ({ token }) => {
  const [state, setState] = useState({
    fetched: false,
  });
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
    }
  }, []);
  return <div>{token ? <ShowVideos /> : <LogoutPage />}</div>;
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Inscriptions);
