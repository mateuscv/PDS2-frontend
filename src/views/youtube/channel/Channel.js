import React, { useEffect } from "react";
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
import ShowVideos from "../containers/showVideos";
//Style
import "../styles/youtube.css";
var context = "text";
const Channel = () => {
  useEffect(() => {
    changeContent("video");
  }, []);
  var content = 0;
  var subscribe = false;
  const Change = (cond) => {
    subscribe = cond;
  };
  const changeContent = (component) => {
    console.log(component);
    // eslint-disable-next-line default-case
    switch (component) {
      case "video":
        return (
          <div>
            <ShowVideos />
          </div>
        );
      case "text":
        return <h1>Texto</h1>;
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
                {subscribe === false && (
                  <CButton
                    id="inscribe"
                    class="inscribe"
                    onClick={() => Change(true)}
                  >
                    Inscrever-se
                  </CButton>
                )}{" "}
                {subscribe === true && (
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
                  onClick={() => {}}
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Vídeos
                </CButton>
              </CCol>
              <CCol sm="3">
                <CButton
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Playlists
                </CButton>
              </CCol>
              <CCol sm="3">
                <CButton
                  style={{ border: "1px solid", width: "100%", height: "130%" }}
                >
                  Sobre
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </header>
      <ShowVideos />
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Channel);
