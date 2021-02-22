//REACT
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CLink,
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
import ShowVideos from "../components/showVideos";
//Style
import "../styles/nintube.css";
//API
import { Inscribe } from "../../../util/Api";

const Channel = ({ user }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    fetched: false,
    content: 1,
    subscribe: false,
  });
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
      changeContent("text");
    }
  }, []);

  const Change = (cond) => {
    var data = { token: user.token, channel_id: "channel_id" };
    Inscribe(data)
      .then(function (data) {
        setState({ ...state, subscribe: cond });
      })
      .catch((err) => {
        setState({
          ...state,
          error: "Algum problema aconteceu, tente novamente mais tarde!",
          message: "",
        });
      });
  };
  const changeContent = (component) => {
    console.log(component);
    // eslint-disable-next-line default-case
    switch (component) {
      case "init":
        setState({ ...state, content: 1 });
        break;
      case "video":
        setState({ ...state, content: 2 });
        break;
      case "playlist":
        setState({ ...state, content: 3 });
        break;
      case "about":
        setState({ ...state, content: 4 });
        break;
    }
  };
  return (
    <div id="test">
      <header style={{ marginTop: "0%" }}>
        <CImg
          style={{ width: "100%" }}
          src={
            "https://cdn.discordapp.com/attachments/300483456440336385/775913742943911936/unknown.png"
          }
        ></CImg>

        <CCard style={{ height: "100px" }}>
          <CCardBody style={{ width: "100%" }}>
            <CCardSubtitle>
              <div className=" float-left">
                <div className="c-avatar">
                  <CImg
                    style={{ cursor: "pointer" }}
                    src="avatars/7.jpg"
                    className="c-avatar-img"
                  />
                </div>
              </div>
              <div>
                <span className="h3">Manual do Mundo</span>
                {state.subscribe === false && (
                  <CButton
                    id="inscribe"
                    class="inscribe"
                    onClick={() => Change(true)}
                  >
                    Inscrever-se
                  </CButton>
                )}{" "}
                {state.subscribe === true && (
                  <CButton
                    id="inscribe"
                    class="registered"
                    onClick={() => Change(false)}
                  >
                    Inscrito
                  </CButton>
                )}
              </div>
            </CCardSubtitle>
            <CRow>
              <CCol sm="3">
                <CButton
                  onClick={() => {
                    changeContent("init");
                  }}
                  style={{
                    border: "1px solid",
                    width: "100%",
                    height: "130%",
                  }}
                >
                  Início
                </CButton>
              </CCol>
              <CCol sm="3">
                <CButton
                  onClick={() => {
                    changeContent("video");
                  }}
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Vídeos
                </CButton>
              </CCol>
              <CCol sm="3">
                <CButton
                  onClick={() => {
                    changeContent("playlist");
                  }}
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Playlists
                </CButton>
              </CCol>
              <CCol sm="3">
                <CButton
                  onClick={() => {
                    changeContent("about");
                  }}
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Sobre
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </header>
      {state.content === 1 ? <h1>Inicio</h1> : null}
      {state.content === 2 ? <ShowVideos /> : null}
      {state.content === 3 ? <h1>Playlist</h1> : null}
      {state.content === 4 ? <h1>Sobre</h1> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Channel);
