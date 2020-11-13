import React, { useEffect } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
//Componets
import Videos from "../containers/showVideos";
//Style

const Inscriptions = () => {
  useEffect(() => {
    console.log("oi");
  }, []);
  return (
    <div>
      <Videos />
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Inscriptions);
