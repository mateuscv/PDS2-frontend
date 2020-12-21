//REACT
import React, { useState, useEffect } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CCardHeader,
  CImg,
} from "@coreui/react";
//Componets
import StackVideo from "../containers/stackVideo";
//Style
//API

const Fire = ({ history, token }) => {
  const [state, setState] = useState({
    fetched: false,
  });
  const handleClick = () => {
    history.push("/view");
  };

  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
      console.log(token);
    }
  }, []);
  return (
    <div>
      <StackVideo />
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Fire);
