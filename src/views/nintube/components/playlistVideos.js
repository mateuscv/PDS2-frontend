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

const playlist = { title: "Minha Playlist", privacy: true, views: 182 };

const videos = [
  {
    id: 1,
    title:
      "FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29",
    channel: "Lucas Nhimi",
    thumb:
      "https://cdn.discordapp.com/attachments/300483456440336385/789180212175699998/unknown.png",
  },
  {
    id: 2,
    title:
      "COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 3,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 4,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 5,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 6,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 7,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 8,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 9,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  {
    id: 10,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
];

const PlaylistVideos = ({ user }) => {
  const [state, setState] = useState({
    fetched: false,
    playlist: "",
    videos: [],
  });
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true, playlist: playlist, videos: videos });
    }
  }, [state]);
  return (<div>
    <CContainer fluid>
      <h1>{ state.playlist.title }</h1>
      <CRow>
          <CCol sm="4">
            <CCard class="bg-black border border-dark" style={{ width:"100%", border: "2px solid #B3272C" }}>
              <div>
                <CCardBody
                  className=" float-left"
                  style={{ height: "100px" }}
                >
                </CCardBody>
                  <CCardText
                    style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                  >
                    {state.playlist.privacy ? (
                      <p> Privada • {state.videos.length} vídeos • {state.playlist.views} visualizações</p>
                    ) : (<p> Pública • {state.videos.length} vídeos • {state.playlist.views} visualizações </p>)}

                    {" "}
                    <span
                      style={{ cursor: "pointer" }}
                    >
                    </span>{" "}
                  </CCardText>
              </div>
            </CCard>
          </CCol>
      </CRow>
      <CRow>
        {state.videos.map((item, index) => (
          <CCol sm="4">
            <CCard style={{ width:"100%", border: "2px solid #B3272C" }}>
              <CImg
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
                </CCardBody>
                <CCardBody>
                  <CCardSubtitle
                    style={{ cursor: "pointer" }}
                  >
                    {item.title.substring(0, 100) + "..."}
                  </CCardSubtitle>{" "}
                  <CCardText
                    style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                  >
                    {" "}
                    <span
                      style={{ cursor: "pointer" }}
                    >
                      {item.channel}
                    </span>{" "}
                  </CCardText>
                </CCardBody>
              </div>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer> </div>);
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideos);
