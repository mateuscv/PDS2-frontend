//REACT
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import { CRow, CCol, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
import Player from "../components/Player";
import Recommended from "../components/Recommended";
//Style
//API
import Dropzone from "react-dropzone";
import { alert } from "../../../util/alertApi";
import { Inscribe, Report } from "../../../util/Api";

const View = ({ token }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    fetched: false,
    subscribe: true,
    color_like: "white",
    color_dislike: "white",
    video: {
      id: 1,
      title: "Titulo",
      liked: "like",
      likes: 30,
      dislikes: 45,
    },
  });

  const Change = (cond) => {
    var data = { token: token, channel_id: id };
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

  const Liked = (liked) => {
    var data = { token: token, channel_id: id, liked: liked };
    // liked(data).then(function (data) {
    // eslint-disable-next-line default-case
    switch (liked) {
      case "like":
        setState({ ...state, color_like: "green", color_dislike: "white" });
        break;
      case "dislike":
        setState({ ...state, color_dislike: "red", color_like: "white" });
        break;
    }
    // });
  };

  const reportVideo = () => {
    var data = { token: token, video_id: state.video.id, type: "video" };
    Report(data)
      .then(function (data) {
        alert("Reporte", "Seu reporte foi enviado com sucesso!");
      })
      .catch((err) => {
        alert(
          "Reporte",
          "Ouve algum erro com o seu reporte tente novamente mais tarde!"
        );
      });
  };

  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
    }
  }, []);
  return (
    <div style={{ display: "flex" }}>
      {/* <CRow>
        <CCol sm="8" style={{ display: "flex" }}> */}
      <div style={{ marginRight: "auto" }}>
        <Player />
        <div style={{ marginLeft: "50%" }}>
          <CButton
            style={{ color: state.color_like }}
            onClick={() => Liked("like")}
          >
            <CIcon name="cilThumbUp" /> {state.video.likes}
          </CButton>
          <CButton
            style={{ color: state.color_dislike }}
            onClick={() => Liked("dislike")}
          >
            <CIcon name="cilThumbDown" /> {state.video.dislikes}
          </CButton>
          <CButton
            style={{ border: "1px solid red", color: "white" }}
            onClick={() =>
              alert("Compartilhar", "http://localhost:3000/#/view/" + id, [
                { label: "Fechar", onClick: "" },
              ])
            }
          >
            <CIcon name="cil-share" /> Compartilhar
          </CButton>
          <>
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
          </>
          <CButton class="inscribe" onClick={() => reportVideo()}>
            Reportar
          </CButton>
        </div>
      </div>
      {/* </CCol>
        <CCol sm="4"> */}
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <Recommended />
      </div>
      {/* </CCol>
      </CRow> */}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(View);
