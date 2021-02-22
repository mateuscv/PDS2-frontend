//REACT
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import { CRow, CCol, CButton, CBreadcrumb } from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
import Player from "../components/Player";
import Comments from "../components/Comments";
import Recommended from "../components/Recommended";
//Style
//API
import Dropzone from "react-dropzone";
import { alert } from "../../../util/alertApi";
import { Inscribe, Report, getVideo, API_URL } from "../../../util/Api";
//Style

const View = ({ token }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    fetched: false,
    subscribe: false,
    color_like: "",
    color_dislike: "",
    video: {
      id: -1,
      title: "",
      liked: -1,
      likes: 0,
      dislikes: 0,
      views: "0",
    },
  });

  const Change = (cond) => {
    var data = {
      token: token,
      target_id: "ef89ac6d-7fdb-40ab-8fb7-298d7406ef3e",
    };
    console.log(data);
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
        var video = state.video;
        if (video.liked === 1) {
          video.likes -= 1;
          video.liked = -1;
          setState({
            ...state,
            color_like: "white",
            video,
          });
        } else {
          video.likes += 1;
          video.dislikes =
            video.liked === 0 ? video.dislikes - 1 : video.dislikes;
          video.liked = 1;
          setState({
            ...state,
            color_like: "green",
            color_dislike: "white",
            video,
          });
        }
        break;
      case "dislike":
        var video = state.video;
        if (video.liked === 0) {
          video.dislikes -= 1;
          video.liked = -1;
          setState({
            ...state,
            color_dislike: "white",
            video,
          });
        } else {
          video.dislikes += 1;
          video.likes = video.liked === 1 ? video.likes - 1 : video.likes;
          video.liked = 0;
          setState({
            ...state,
            color_dislike: "red",
            color_like: "white",
            video,
          });
        }
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
      var data = { video_id: id, token: token };
      // getVideo(data).then(function (data) {});
      var video = {
        id: 1,
        title: "Titulo do Fisico",
        liked: -1,
        likes: 30,
        dislikes: 45,
        views: "1.000.648",
      };
      setState({
        ...state,
        color_like: video.liked === 1 ? "green" : "white",
        color_dislike: video.liked === 0 ? "red" : "white",
        video,
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
            <a style={{ color: "lightblue" }}>#TheWeekend</a>
          </div>
          <h5 style={{ width: "90%", marginLeft: "1.5%", color: "white" }}>
            The Weeknd - Blinding Lights (Official Audio)
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
              src="https://cdn.discordapp.com/attachments/704786714769490101/811992050177278002/unnamed.jpg"
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
                <span>The Weeknd</span>
                <p>23M subscribers</p>
              </div>
              <div style={{ width: "1%" }}>
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
              </div>
            </div>
            <div style={{ color: "white" }}>
              Official audio for The Weeknd "Blinding Lights" - available
              everywhere now: http://theweeknd.co/blindinglightsYD​ ►Subscribe
              to The Weeknd on YouTube: http://theweeknd.co/subscribeYD​
            </div>
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

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(View);
