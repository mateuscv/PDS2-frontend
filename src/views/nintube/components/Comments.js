import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  CWidgetIcon,
  CCardSubtitle,
  CCardText,
  CInput,
  CCardHeader,
  CImg,
  CBreadcrumb,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
//API
// import { Report } from "../../../util/Api";
import { alert } from "../../../util/alertApi";
import { API_URL, sendComment } from "../../../util/Api";
//Style

const commentsList = [
  {
    id: 1,
    nickname: "yMustafa",
    comment: "Isso eh uma merda",
    date: "há 30 min",
    src: API_URL + "media/nintube/default.png",
    reply_id: "",
  },
  {
    id: 2,
    nickname: "yAb",
    comment: "Cara eh muito bom",
    date: "há 60 min",
    src: API_URL + "media/nintube/default.png",
    reply_id: 1,
  },
  {
    id: 3,
    nickname: "Davi Teixeira",
    comment: "Feliz 2020",
    date: "há 3 horas",
    src: API_URL + "media/nintube/default.png",
    reply_id: "",
  },
  {
    id: 4,
    nickname: "Yoshi",
    comment: `-Skillet: You get me high
    -Three Days Grace: You don't get me high anymore 
    -Skillet: One Day too late
    -Three Days Grace: Never too late
    -Skillet: Don't Wake Me`,
    date: "há 3 dias",
    src: API_URL + "media/nintube/default.png",
    reply_id: "",
  },
  {
    id: 5,
    nickname: "Jhin",
    comment: "Everyone- Thank god 2020 ended... I feel invincible.. ",
    date: "há 1 semanas",
    src: API_URL + "media/nintube/default.png",
    reply_id: 4,
  },
  {
    id: 6,
    nickname: "yAb",
    comment: "Julius Summerchase",
    date: "há 60 min",
    src: API_URL + "media/nintube/default.png",
    reply_id: 1,
  },
];

const Comments = ({ user }) => {
  const [state, setState] = useState({
    fetched: false,
    color_like: "white",
    color_dislike: "white",
    avatar: "",
    newComment: "",
    AnswersOne: "",
    AnswersTwo: "",
    showComment: false,
    showAns: false,
    idAns: "",
    showAnsTwo: false,
    idAnsTwo: "",
    dispAns: [],
    fiComment: [],
    secComment: [],
    showSec: [],
  });

  let history = useHistory();
  let video_id = useParams();

  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };

  const comment = () => {
    if (user.token) {
      if (!state.showComment) {
        setState({
          ...state,
          newComment: "",
          showComment: true,
        });
      }
    } else {
      alert("Login", "Você não está logado!");
    }
  };

  const sendCom = (text, nvl, reply_id, aux) => {
    console.log("send");
    if (nvl === 0) {
      console.log("nvl 0");
      var data = {
        token: user.token,
        text,
        video_id: video_id.id,
        reply_id: "",
      };
      console.log(data);
      sendComment(data).then(function (data) {
        if (data.status === 1) {
          exitComment();
        }
      });
    } else if (nvl === 1) {
      console.log("nvl 1");
      var data = {
        token: user.token,
        text,
        video_id: video_id.id,
        reply_id,
      };
      console.log(data);
      sendComment(data).then(function (data) {
        if (data.status === 1) {
          exitAns(1);
        }
      });
    } else {
      console.log("nvl 2 ");
      var data = {
        token: user.token,
        text: "@" + aux + " " + text,
        video_id: video_id.id,
        reply_id,
      };
      console.log(data);
      sendComment(data).then(function (data) {
        if (data.status === 1) {
          exitAns(2);
        }
      });
    }
  };

  const exitComment = () => {
    setState({
      ...state,
      newComment: "",
      showComment: false,
    });
  };

  const exitAns = (nvl) => {
    if (nvl === 1) {
      setState({
        ...state,
        AnswersOne: "",
        showAns: false,
        idAns: "",
      });
    } else {
      setState({
        ...state,
        newComment: "",
        showAnsTwo: false,
        idAnsTwo: "",
      });
    }
  };

  const showAns = (ind, id) => {
    let dispAns = state.dispAns;
    dispAns[ind].dis = !dispAns[ind].dis;
    // console.log(display);
    setState({ ...state, dispAns });
  };

  const answers = (nvl, id) => {
    if (user.token) {
      if (nvl === 1) {
        setState({
          ...state,
          AnswersOne: "",
          showAns: true,
          idAns: id,
        });
      } else {
        setState({
          ...state,
          newComment: "",
          showAnsTwo: true,
          idAnsTwo: id,
        });
      }
    } else {
      alert("Login", "Você não está logado!");
    }
  };

  const reportVideo = () => {
    alert("Reporte", "Seu reporte foi enviado com sucesso!");
  };

  useEffect(() => {
    if (!state.fetched) {
      var img = "";
      if (user.token) {
        img = user.avatar;
      } else {
        img = API_URL + "media/nintube/default.png";
      }
      var listAux = Array();
      var mtxAux = Array();
      var showAux = Array();
      for (let i = 0; i < commentsList.length; i++) {
        if (commentsList[i].reply_id === "") {
          listAux.push({
            id: commentsList[i].id,
            nickname: commentsList[i].nickname,
            comment: commentsList[i].comment,
            date: commentsList[i].date,
            src: commentsList[i].src,
            reply_id: commentsList[i].reply_id,
          });
          showAux.push({
            id: commentsList[i].id,
            dis: false,
            info: Array,
          });
        } else {
          mtxAux.push({
            id: commentsList[i].id,
            nickname: commentsList[i].nickname,
            comment: commentsList[i].comment,
            date: commentsList[i].date,
            src: commentsList[i].src,
            reply_id: commentsList[i].reply_id,
          });
        }
      }

      for (let i = 0; i < showAux.length; i++) {
        var vexAux = new Array();
        for (let idx = 0; idx < mtxAux.length; idx++) {
          if (showAux[i].id === mtxAux[idx].reply_id) {
            var aux = new Array();
            aux.push({
              id: mtxAux[idx].id,
              nickname: mtxAux[idx].nickname,
              comment: mtxAux[idx].comment,
              date: mtxAux[idx].date,
              src: mtxAux[idx].src,
              reply_id: mtxAux[idx].reply_id,
            });
            vexAux.push(aux);
          }
        }
        showAux[i].info = vexAux;
      }

      setState({
        ...state,
        fetched: true,
        fiComment: listAux,
        secComment: mtxAux,
        dispAns: showAux,
        avatar: img,
      });
    }
  }, []);
  return (
    <div>
      <CRow>
        <CCol sm="12">
          <div>
            <CBreadcrumb
              style={{ width: "95%", marginLeft: "1.7%", display: "flex" }}
            >
              <div style={{ width: "7%", height: "100%" }}>
                <img
                  src={state.avatar}
                  width="44"
                  height="44"
                  style={{
                    borderRadius: "40%",
                  }}
                />
              </div>
              <div style={{ width: "90%" }}>
                <div style={{ width: "100%", color: "white" }}>
                  <div style={{ width: "100%" }}>
                    <input
                      // id="contenteditable-root"
                      onClick={() => comment()}
                      dir="auto"
                      value={state.newComment}
                      placeholder="Adicionar um comentário público.."
                      // class="style-scope yt-formatted-string"
                      // value
                      onChange={(e) => {
                        setState({ ...state, newComment: e.target.value });
                      }}
                      style={{
                        color: "white",
                        width: "100%",
                        border: "1px solid white",
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        background: "transparent",
                      }}
                    ></input>
                  </div>
                </div>
                {state.showComment && (
                  <div style={{ width: "100%", marginTop: "3px" }}>
                    <a
                      class="myCancel"
                      onClick={() => exitComment()}
                      style={{ marginLeft: "76%", color: "white" }}
                    >
                      Cancelar
                    </a>
                    <a
                      class="myBut "
                      onClick={() => sendCom(state.newComment, 0, "", "")}
                      style={{ marginLeft: "1%" }}
                    >
                      Enviar
                    </a>
                  </div>
                )}
              </div>
            </CBreadcrumb>
            {state.fiComment.map((item, index) => (
              <div
                style={{
                  width: "95%",
                  marginLeft: "3%",
                  display: "flex",
                  marginTop: "1%",
                }}
              >
                <div style={{ width: "7%", height: "100%" }}>
                  <img src={item.src} width="44" height="44" />
                </div>
                <div class="showDiv" style={{ width: "90%", color: "white" }}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <span style={{ width: "98%" }}>
                      {item.nickname} {item.date}
                    </span>
                    <div
                      class="showReport"
                      style={{
                        width: "3%",
                        alignItems: "center",
                      }}
                      onClick={() => reportVideo()}
                    >
                      <CIcon name="cilFlagAlt" style={{ marginLeft: "5px" }} />
                    </div>
                  </div>
                  <p>{item.comment}</p>
                  <div>
                    <CButton
                      style={{ color: state.color_like, marginLeft: "-1.1%" }}
                      // onClick={() => Liked("like")}
                    >
                      <CIcon name="cilThumbUp" /> 45
                    </CButton>
                    <CButton style={{ color: state.color_dislike }}>
                      <CIcon name="cilThumbDown" />
                    </CButton>
                    <CButton
                      style={{ color: "white" }}
                      onClick={() => answers(1, item.id)}
                    >
                      Responder
                    </CButton>
                    {state.showAns && state.idAns === item.id && (
                      <div
                        style={{
                          width: "95%",
                          marginLeft: "1.7%",
                          display: "flex",
                        }}
                      >
                        <div style={{ width: "7%", height: "100%" }}>
                          <img
                            src={state.avatar}
                            style={{
                              borderRadius: "40%",
                            }}
                            width="44"
                            height="44"
                          />
                        </div>
                        <div style={{ width: "90%" }}>
                          <div style={{ width: "100%", color: "white" }}>
                            <div style={{ width: "100%" }}>
                              <input
                                dir="auto"
                                value={state.AnswersOne}
                                placeholder="Adicionar um comentário público.."
                                onChange={(e) => {
                                  setState({
                                    ...state,
                                    AnswersOne: e.target.value,
                                  });
                                }}
                                style={{
                                  color: "white",
                                  width: "100%",
                                  border: "1px solid white",
                                  borderTop: "none",
                                  borderRight: "none",
                                  borderLeft: "none",
                                  background: "transparent",
                                }}
                              ></input>
                            </div>
                          </div>

                          <div style={{ width: "100%", marginTop: "3px" }}>
                            <a
                              class="myCancel"
                              onClick={() => exitAns(1)}
                              style={{ marginLeft: "66%", color: "white" }}
                            >
                              Cancelar
                            </a>
                            <a
                              class="myBut "
                              onClick={() =>
                                sendCom(state.AnswersOne, 1, state.idAns, "")
                              }
                              style={{ marginLeft: "1%", color: "black" }}
                            >
                              Enviar
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {state.dispAns[index].info.length !== 0 && (
                    <div>
                      {state.dispAns[index].dis && (
                        <div>
                          {state.dispAns[index].info.map((itm, idx) => (
                            <div
                              style={{
                                width: "95%",
                                marginLeft: "3%",
                                display: "flex",
                                marginTop: "1%",
                              }}
                            >
                              <div style={{ width: "7%", height: "100%" }}>
                                <img src={itm[0].src} width="44" height="44" />
                              </div>
                              <div
                                class="showDivSec"
                                style={{ width: "90%", color: "white" }}
                              >
                                <div style={{ width: "100%", display: "flex" }}>
                                  <span style={{ width: "98%" }}>
                                    {itm[0].nickname} {itm[0].date}
                                  </span>
                                  <div
                                    class="showReportSec"
                                    style={{
                                      width: "3%",
                                      alignItems: "center",
                                    }}
                                    onClick={() => reportVideo()}
                                  >
                                    <CIcon
                                      name="cilFlagAlt"
                                      style={{ marginLeft: "5px" }}
                                    />
                                  </div>
                                </div>
                                <p>{itm[0].comment}</p>
                                <div>
                                  <CButton
                                    style={{
                                      color: state.color_like,
                                      marginLeft: "-1.1%",
                                    }}
                                    // onClick={() => Liked("like")}
                                  >
                                    <CIcon name="cilThumbUp" /> 45
                                  </CButton>
                                  <CButton
                                    style={{ color: state.color_dislike }}
                                  >
                                    <CIcon name="cilThumbDown" />
                                  </CButton>
                                  <CButton
                                    style={{ color: "white" }}
                                    onClick={() => answers(2, itm[0].id)}
                                  >
                                    Responder
                                  </CButton>
                                  {state.showAnsTwo &&
                                    state.idAnsTwo === itm[0].id && (
                                      <div
                                        style={{
                                          width: "95%",
                                          marginLeft: "1.7%",
                                          display: "flex",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "7%",
                                            height: "100%",
                                          }}
                                        >
                                          <img
                                            src={state.avatar}
                                            width="44"
                                            height="44"
                                            style={{
                                              borderRadius: "40%",
                                            }}
                                          />
                                        </div>
                                        <div style={{ width: "90%" }}>
                                          <div
                                            style={{
                                              width: "100%",
                                              color: "white",
                                            }}
                                          >
                                            <div style={{ width: "100%" }}>
                                              <input
                                                dir="auto"
                                                value={state.AnswersTwo}
                                                placeholder="Adicionar um comentário público.."
                                                onChange={(e) => {
                                                  setState({
                                                    ...state,
                                                    AnswersTwo: e.target.value,
                                                  });
                                                }}
                                                style={{
                                                  color: "white",
                                                  width: "100%",
                                                  border: "1px solid white",
                                                  borderTop: "none",
                                                  borderRight: "none",
                                                  borderLeft: "none",
                                                  background: "transparent",
                                                }}
                                              ></input>
                                            </div>
                                          </div>

                                          <div
                                            style={{
                                              width: "100%",
                                              marginTop: "3px",
                                            }}
                                          >
                                            <a
                                              class="myCancel"
                                              onClick={() => exitAns(2)}
                                              style={{
                                                marginLeft: "66%",
                                                color: "white",
                                              }}
                                            >
                                              Cancelar
                                            </a>
                                            <a
                                              class="myBut "
                                              onClick={() =>
                                                sendCom(
                                                  state.AnswersTwo,
                                                  2,
                                                  state.idAnsTwo,
                                                  itm[0].nickname
                                                )
                                              }
                                              style={{
                                                marginLeft: "1%",
                                                color: "black",
                                              }}
                                            >
                                              Enviar
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div>
                        <>
                          {state.dispAns[index].dis ? (
                            <CButton
                              class="showAnswers"
                              onClick={() => showAns(index, item.id)}
                            >
                              <CIcon
                                name="cilCaretTop"
                                style={{ marginRight: "10px" }}
                              />
                              Ocultar {state.dispAns[index].info.length}{" "}
                              Respostas
                            </CButton>
                          ) : (
                            <CButton
                              class="showAnswers"
                              onClick={() => showAns(index, item.id)}
                            >
                              <CIcon
                                name="cilCaretBottom"
                                style={{ marginRight: "10px" }}
                              />
                              Ver {state.dispAns[index].info.length} Respostas
                            </CButton>
                          )}
                        </>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
