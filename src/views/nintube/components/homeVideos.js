//REACT
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
  CCardSubtitle,
  CCardText,
  CCardHeader,
  CImg,
} from "@coreui/react";
//Componets
//Style
//API
import { feedVideos } from "../../../util/Api";
import { diffDate } from "../../../util/dateDiff";

const videos = [
  {
    id: 1,
    title:
      "FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29",
    channel: "Lucas Nhimi",
    views: "11 mi de visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://cdn.discordapp.com/attachments/300483456440336385/789180212175699998/unknown.png",
  },
  {
    id: 2,
    title:
      "COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02",
    channel: "Lucas Nhimi",
    views: "957 mil visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 3,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    channel: "Lucas Nhimi",
    views: "106 mil visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 4,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    channel: "Lucas Nhimi",
    views: "5,6 mi de visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 5,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    views: "2,2 mi de visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 6,
    title: "COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01",
    channel: "Lucas Nhimi",
    views: "233 mil visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 7,
    title:
      "PRÉ-REQUISITOS | Criando uma Rede Social com React.js e .NET Core #01",
    channel: "Lucas Nhimi",
    views: "118 mil visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 8,
    title:
      "GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04",
    channel: "Lucas Nhimi",
    views: "1,9 mi de visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
];

const HomeVideos = ({ user }) => {
  const [state, setState] = useState({
    videos: [],
    fetched: false,
    today: new Date(),
  });
  let history = useHistory();
  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };
  useEffect(() => {
    if (!state.fetched) {
      var data = {
        numberSkip: 0,
      };
      feedVideos(data).then(function (data) {
        setState({ ...state, fetched: true, videos: data });
      });
    }
  }, []);
  return (
    <div>
      <CContainer fluid>
        <CRow>
          {state.videos.map((item, index) => (
            <CCol sm="4">
              <CCard style={{ border: "2px solid #B3272C" }}>
                <CImg
                  onClick={() => handleClick("view", item.id)}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  src={item.thumb}
                />
                <div>
                  <CCardBody
                    className=" float-left"
                    style={{ height: "100px" }}
                  >
                    <div className="c-avatar">
                      <CImg
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("channel", item.id)}
                        src={item.avatar}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                      />
                    </div>
                  </CCardBody>
                  <CCardBody>
                    <CCardSubtitle
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick("view", item.id)}
                    >
                      {item.title.substring(0, 100) + "..."}
                    </CCardSubtitle>{" "}
                    <CCardText
                      style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                    >
                      {" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("channel", item.id)}
                      >
                        {item.channel}
                      </span>
                      <CCardText
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >{`${item.views} • ${diffDate(
                        state.today,
                        item.date
                      )}`}</CCardText>{" "}
                    </CCardText>
                  </CCardBody>
                </div>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HomeVideos);
