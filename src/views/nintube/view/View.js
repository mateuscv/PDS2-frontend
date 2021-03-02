//REACT
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import { CRow, CCol, CButton, CBreadcrumb, CInput } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { confirmAlert } from "react-confirm-alert"; // Import
//Componets
import Player from "../components/Player";
import Comments from "../components/Comments";
import Recommended from "../components/Recommended";
//Style
//API
import Dropzone from "react-dropzone";
import { alert } from "../../../util/alertApi";
import {
  Inscribe,
  Report,
  watchVideo,
  API_URL,
  newLiked,
} from "../../../util/Api";
//Style

const View = ({ user }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    fetched: false,
    subscribe: false,
    color_like: "",
    color_dislike: "",
    video: "",
    report: "",
  });

  const Change = (cond) => {
    if (user.token) {
      var data = {
        token: user.token,
        target_id: state.video.owner_id,
      };

      console.log(data);
      Inscribe(data)
        .then(function (data) {
          let video = state.video;
          if (cond) {
            video.all_subs += 1;
          } else {
            video.all_subs -= 1;
          }
          video.is_subscribed = cond;
          setState({ ...state, video });
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

  const Liked = (liked) => {
    var data = { token: user.token, channel_id: id, liked: liked };
    // liked(data).then(function (data) {
    // eslint-disable-next-line default-case
    switch (liked) {
      case "like":
        var video = state.video;
        if (video.liked === 1) {
          video.likes -= 1;
          video.liked = 0;
          setState({
            ...state,
            color_like: "white",
            video,
          });
        } else if (video.liked === -1) {
          video.likes += 1;
          video.dislikes -= 1;
          video.liked = 1;
          setState({
            ...state,
            color_like: "green",
            color_dislike: "white",
            video,
          });
        } else {
          video.likes += 1;
          video.liked = 1;
          setState({
            ...state,
            color_like: "green",
            video,
          });
        }
        break;
      case "dislike":
        var video = state.video;
        if (video.liked === -1) {
          video.dislikes -= 1;
          video.liked = 0;
          setState({
            ...state,
            color_dislike: "white",
            video,
          });
        } else if (video.liked === 1) {
          video.dislikes += 1;
          video.likes -= 1;
          video.liked = -1;
          setState({
            ...state,
            color_dislike: "red",
            color_like: "white",
            video,
          });
        } else {
          video.dislikes += 1;
          video.liked = -1;
          setState({
            ...state,
            color_dislike: "red",
            video,
          });
        }
        break;
    }
    var video = state.video;

    var data = {
      token: user.token,
      video_id: "06abdd82-f539-46d3-98b5-4bbd0f960440",
      liked: video.liked,
    };

    newLiked(data).then(function (data) {});
    // });
  };

  const reportVideo = () => {
    var data = { token: user.token, video_id: state.video.id, type: "video" };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Report</h1>
            <p>Escreva o Motivo do report abaixo:</p>
            <label style={{ color: "black" }}>Motivo:</label>
            <CInput
              type="text"
              onChange={(e) => {
                setState({ ...state, report: e.target.value });
              }}
            ></CInput>
            <button class="myBut" onClick={onClose}>
              Enviar
            </button>
            <button class="myBut" onClick={sendReport} onClick={onClose}>
              Sair
            </button>
          </div>
        );
      },
    });
  };

  const sendReport = () => {
    var data = {
      report_text: state.report,
    };
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
      if (user.token) {
        var data = {
          video_id: "06abdd82-f539-46d3-98b5-4bbd0f960440",
          token: user.token,
        };
      } else {
        var data = {
          video_id: "06abdd82-f539-46d3-98b5-4bbd0f960440",
          token: "",
        };
      }

      watchVideo(data).then(function (data) {
        console.log(data);
        setState({
          ...state,
          video: data,
          color_like: data.liked === 1 ? "green" : "white",
          color_dislike: data.liked === -1 ? "red" : "white",
        });
      });
      setState({
        ...state,
        fetched: true,
      });
    }
  }, []);
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* <CRow>
        <CCol sm="8" style={{ display: "flex" }}> */}
      <div style={{ marginRight: "auto", width: "70%" }}>
        <Player />
        <CBreadcrumb style={{ width: "95%", marginLeft: "1.7%" }}>
          <div style={{ width: "90%", marginLeft: "1.5%", color: "white" }}>
            <a style={{ color: "lightblue" }}></a>
          </div>
          <h5 style={{ width: "90%", marginLeft: "1.5%", color: "white" }}>
            {state.video.title}
          </h5>
          <div
            style={{
              width: "100%",
              marginLeft: "1.5%",
              display: "flex",
              height: "25px",
            }}
          >
            <div style={{ width: "50%", verticalAlign: "center" }}>
              <span style={{ color: "white", verticalAlign: "center" }}>
                {state.video.views} Visualizações
              </span>
            </div>
            <div
              style={{
                marginLeft: "10%",
                height: "100%",
                // verticalAlign: "top",
              }}
            >
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
                style={{ color: "white" }}
                onClick={() =>
                  alert("Compartilhar", "http://localhost:3000/#/view/" + id, [
                    { label: "Fechar", onClick: "" },
                  ])
                }
              >
                <CIcon name="cil-share" /> Compartilhar
              </CButton>

              <CButton
                style={{
                  color: "white",
                }}
                onClick={() => reportVideo()}
              >
                <CIcon name="cilFlagAlt" /> Reportar
              </CButton>
            </div>
          </div>
        </CBreadcrumb>
        <CBreadcrumb
          style={{ width: "95%", marginLeft: "1.7%", display: "flex" }}
        >
          <div style={{ width: "7%", height: "100%" }}>
            <img
              src={state.video.owner_avatar}
              style={{ borderRadius: "40%" }}
              width="44"
              height="44"
            />
          </div>
          <div style={{ width: "90%" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                color: "white",
              }}
            >
              <div style={{ width: "90%" }}>
                <span>{state.video.owner_nick}</span>
                <p>{state.video.all_subs} subscribers</p>
              </div>
              <div style={{ width: "1%" }}>
                <>
                  {state.video.is_subscribed === false && (
                    <CButton
                      id="inscribe"
                      class="inscribe"
                      onClick={() => Change(true)}
                    >
                      Inscrever-se
                    </CButton>
                  )}{" "}
                  {state.video.is_subscribed === true && (
                    <CButton
                      id="inscribe"
                      class="registered"
                      onClick={() => Change(false)}
                    >
                      Inscrito
                    </CButton>
                  )}
                </>
              </div>
            </div>
            <div style={{ color: "white" }}>{state.video.description}</div>
          </div>
        </CBreadcrumb>
        <Comments />
      </div>
      {/* </CCol>
        <CCol sm="4"> */}
      <div style={{ marginLeft: "auto", width: "25%" }}>
        <Recommended />
      </div>
      {/* </CCol>
      </CRow> */}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(View);
