import React, { useEffect } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import { CButton } from "@coreui/react";
//Componets
//Style

const Library = ({ history }) => {
  const handleClick = () => {
    history.push("/playlist");
  };
  useEffect(() => {
    console.log("oi");
  }, []);
  return (
    <div>
      <h1>Biblioteca</h1>
      <CButton onClick={() => handleClick()}>Playlist</CButton>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Library);
