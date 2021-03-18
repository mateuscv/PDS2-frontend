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
//API
import { listPlaylist } from "../../../util/Api";

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
      var data = {token: user.token};
      /*listPlaylist(data).then(function (data){
        setState({ ...state, fetched:true, playlist: data.playlist, videos: data.videos});
      });*/
      setState({ ...state, fetched: true, playlist: playlist, videos: videos });
    }
  }, [state, user.token]);
  return (<div>
    <CContainer fluid>
      <h1>{state.playlist.title}</h1>
      <CRow>
        <CCol sm="3">
          <CCard class="bg-black border border-dark" style={{ position:"relative",textAlign:"center", width:"100%", height:"20%", border: "2px solid #B3272C" }}>
            <div>
              <CCardBody
                style={{ height: "100px" }}
              >
                  {state.videos.length !== 0 && (
                    <CImg
                    style={{
                      width: "100%",
                      height: "200px",
                      cursor: "pointer",
                      float: "left",
                      marginRight: "1%",
                      borderBottom: "1px solid black",
                      borderRadius: "10px",
                    }}
                    src={state.videos[0].thumb}
                  />
                  )}

              </CCardBody>
                <CCardText
                  style={{position: "absolute", left:"20%", bottom:"0", marginBottom: "-1%", marginTop: "1.5%" }}
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
        <CCol sm="9">
          {videos.map((item, index) => (
            <CCard
              style={{
                height: "8%",
                marginBottom: "1%",
                border: "2px solid #B3272C",
              }}
            >
              <CCardBody style={{ margin: "0" }}>
                <CImg
                  style={{
                    width: "125px",
                    height: "75px",
                    cursor: "pointer",
                    float: "left",
                    marginRight: "1%",
                    borderBottom: "1px solid black",
                    borderRadius: "10px",
                  }}
                  src={item.thumb}
                />
                <CCardText>
                  <CCardText>
                    <h5
                      style={{ cursor: "pointer" }}
                    >
                      {item.title.substring(0, 100) + "..."}
                    </h5>
                    <span>
                      {item.channel}
                    </span>{" "}
                  </CCardText>

                </CCardText>
              </CCardBody>
            </CCard>
          ))}
        </CCol>
      </CRow>
    </CContainer>
  </div>)};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideos);
