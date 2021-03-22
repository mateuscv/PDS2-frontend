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
import AllPlaylists from "../components/allPlaylists";
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
      changeContent("video");
    }
  }, []);

  const Change = (cond) => {
    if (user.token) {
      var data = { token: user.token, target_id: id };
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
    } else {
      alert("Login", "Você não está logado!");
    }
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
      <header>
        {/* <CImg
          style={{ width: "100%" }}
          src={
            "https://cdn.discordapp.com/attachments/300483456440336385/775913742943911936/unknown.png"
          }
        ></CImg> */}

        <CCard style={{ height: "100%" }}>
          <CCardBody style={{ width: "100%" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  // margin: "0",
                  // verticalAlign: "middle",
                  // flexDirection: "row",
                  // flexWrap: "nowrap",
                  marginBottom: "1%",
                }}
              >
                <div
                  style={{
                    width: "5%",
                    marginRight: "1%",
                  }}
                >
                  <CImg src="avatars/7.jpg" className="c-avatar-img" />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {/*  */}
                    <span>
                      <span
                        className="h2"
                        style={
                          {
                            // margin: "auto",
                          }
                        }
                      >
                        Manual do Mundo
                      </span>{" "}
                      <br />
                      10 Mil de inscritos
                    </span>
                  </div>
                  {state.subscribe === false && id !== user.token && (
                    <div
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      <CButton
                        id="inscribe"
                        class="inscribe"
                        onClick={() => Change(true)}
                      >
                        Inscrever-se
                      </CButton>
                    </div>
                  )}
                  {state.subscribe === true && id !== user.token && (
                    <div
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      <CButton
                        id="inscribe"
                        class="registered"
                        onClick={() => Change(false)}
                      >
                        Inscrito
                      </CButton>
                    </div>
                  )}
                </div>
              </div>
              <CRow>
                {/* <CCol sm="4">
                  <CButton
                    onClick={() => {
                      changeContent("init");
                    }}
                    className="channel_button"
                  >
                    Início
                  </CButton>
                </CCol> */}
                <CCol sm="6">
                  <CButton
                    onClick={() => {
                      changeContent("video");
                    }}
                    className="channel_button"
                  >
                    Vídeos
                  </CButton>
                </CCol>
                <CCol sm="6">
                  <CButton
                    onClick={() => {
                      changeContent("playlist");
                    }}
                    className="channel_button"
                  >
                    Playlists
                  </CButton>
                </CCol>
                {/* <CCol sm="3">
                <CButton
                  onClick={() => {
                    changeContent("about");
                  }}
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Sobre
                </CButton>
              </CCol>*/}
              </CRow>
            </div>
          </CCardBody>
        </CCard>
      </header>
      {/* {state.content === 1 ? <h1>Inicio</h1> : null} */}
      {state.content === 2 ? <ShowVideos /> : null}
      {state.content === 3 ? <AllPlaylists /> : null}
      {/* {state.content === 4 ? <h1>Sobre</h1> : null} */}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Channel);
