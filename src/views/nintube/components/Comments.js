import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

const commentsList = [
  {
    id: 1,
    nickname: "yMustafa",
    comment: "Isso eh uma merda",
    date: "há 30 min",
    src:
      "https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png",
  },
  {
    id: 2,
    nickname: "yAb",
    comment: "Cara eh muito bom",
    date: "há 60 min",
    src:
      "https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png",
  },
  {
    id: 3,
    nickname: "Davi Teixeira",
    comment: "Feliz 2020",
    date: "há 3 horas",
    src:
      "https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png",
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
    src:
      "https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png",
  },
  {
    id: 5,
    nickname: "Jhin",
    comment: "Everyone- Thank god 2020 ended... I feel invincible.. ",
    date: "há 1 semanas",
    src:
      "https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png",
  },
];

const Comments = ({ token }) => {
  const [state, setState] = useState({
    fetched: false,
    color_like: "white",
    color_dislike: "white",
    newComment: "",
    fethedComment: false,
  });
  let history = useHistory();
  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };
  const comment = () => {
    if (!state.fethedComment) {
      setState({
        ...state,
        newComment: "",
        fethedComment: true,
      });
    }
  };
  const sendComment = () => {
    console.log(state.newComment);
  };
  const exitComment = () => {
    setState({
      ...state,
      newComment: "",
      fethedComment: false,
    });
  };
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
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
                  src="https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png"
                  width="44"
                  height="44"
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
                {state.fethedComment && (
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
                      onClick={() => sendComment()}
                      style={{ marginLeft: "1%" }}
                    >
                      Enviar
                    </a>
                  </div>
                )}
              </div>
            </CBreadcrumb>
            {commentsList.map((item, index) => (
              <CBreadcrumb
                style={{ width: "95%", marginLeft: "1.7%", display: "flex" }}
              >
                <div style={{ width: "7%", height: "100%" }}>
                  <img src={item.src} width="44" height="44" />
                </div>
                <div style={{ width: "90%", color: "white" }}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <span style={{ width: "99%" }}>
                      {item.nickname} {item.date}
                    </span>
                    <div style={{ color: "white" }}>:</div>
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
                    <CButton style={{ color: "white" }}>Responder</CButton>
                  </div>
                  <div>Ver respostas</div>
                </div>
              </CBreadcrumb>
            ))}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
