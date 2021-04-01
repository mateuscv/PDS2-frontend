//REACT
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
import CIcon from "@coreui/icons-react";
//API
import { listPlaylist, removeVideoFromPlaylist } from "../../../util/Api";
import { diffDate } from "../../../util/dateDiff";
import { alert } from "../../../util/alertApi";

const playlist = { title: "Minha Playlist", privacy: true, views: 182 };

const videos = [
  {
    id: 1,
    title:
      // "a",
      "FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29",
    channel: "Lucas Nhimi",
    thumb:
      "https://cdn.discordapp.com/attachments/300483456440336385/789180212175699998/unknown.png",
  },
  {
    id: 2,
    title: "MAMACITA",
    //   "COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02",
    channel: "Lucas Nhimi",
    thumb:
      "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  },
  // {
  //   id: 3,
  //   title:
  //     "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 4,
  //   title:
  //     "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 5,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 6,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 7,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 8,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 9,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 10,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 11,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 12,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 13,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 14,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
  // {
  //   id: 15,
  //   title:
  //     "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
  //   channel: "Lucas Nhimi",
  //   thumb:
  //     "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  // },
];

const PlaylistVideos = ({ user }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    fetched: false,
    playlist: "",
    videos: [],
    today: new Date(),
  });
  let history = useHistory();
  const handleClick = (target) => {
    var route = target.split("_");
    // console.log(target);
    // console.log(route);
    // console.log("/" + route[0] + "/" + route[1]);
    history.push("/" + route[0] + "/" + route[1]);
  };
  const Delete = (video_id, idx) => {
    var data = { playlist_id: id, video_id: video_id };
    console.log(data);
    removeVideoFromPlaylist(data)
      .then(function (data) {
        console.log(data);
        let vet_playlist = [];
        for (let index = 0; index < state.videos.length; index++) {
          if (index !== idx) {
            vet_playlist.push(state.videos[index]);
          }
        }
        setState({ ...state, videos: vet_playlist });
        alert("Ação", "Video foi deletado com sucesso!");
      })
      .catch((err) => {
        alert(
          "Ação",
          "Ouve algume erro ao deletar o video, por favor tentar novamente mais tarde!"
        );
      });
  };

  const buildPlaylist = () => {
    return state.videos.map((item, index) => {
      return (
        <CRow name={"view_" + id}>
          <CCol
            name={"view_" + id}
            onClick={(e) => handleClick(e.target.getAttribute("name"))}
            md="11"
            style={{ cursor: "pointer", width: "100%" }}
          >
            <CCard
              name={"view_" + id}
              id={"id_card_" + index}
              key={"key_card_" + index}
              style={{
                width: "100%",
                // height: "100%",
                marginBottom: "1%",
                border: "2px solid #B3272C",
              }}
            >
              <CCardBody name={"view_" + id} style={{ width: "100%" }} row>
                {/* <CCol> */}
                <CImg
                  name={"view_" + id}
                  style={{
                    width: "125px",
                    // height: "75px",
                    height: "80px",
                    float: "left",
                    marginRight: "1%",
                    borderBottom: "1px solid black",
                    borderRadius: "10px",
                  }}
                  //
                  src={item.thumb}
                />
                {/* </CCol>
                <CCol> */}
                <span name={"view_" + id} row>
                  {/* <CCol style={{ padding: "0" }} md="12"> */}
                  <h5 name={"view_" + id} style={{}}>
                    {item.title.substring(0, 100) + "..."}
                  </h5>
                  <span
                    name={"channel_" + item.owner_id}
                    className="ChannelPlaylist"
                    style={{ cursor: "pointer" }}
                    // onClick={() => handleClick("channel", item.owner_id)}
                  >
                    {item.owner_nick}
                  </span>{" "}
                  {/* </CCol> */}
                </span>{" "}
                {/* </CCol> */}
              </CCardBody>
            </CCard>
          </CCol>
          {state.playlist.is_owner && (
            <CCol md="1" style={{ display: "flex", marginBottom: "1%" }}>
              <CCard
                style={{
                  marginBottom: "auto",
                  marginTop: "auto",
                  marginRight: "auto",
                  marginLeft: "auto",
                  padding: "3px",
                }}
              >
                <CButton
                  color="btn btn-ghost-danger"
                  title="Deletar"
                  onClick={() => Delete(item.id, index)}
                >
                  <CIcon name="cil-trash" />
                </CButton>
              </CCard>
            </CCol>
          )}
        </CRow>
      );
    });
  };
  useEffect(() => {
    if (!state.fetched) {
      var data = { token: user.token, playlist_id: id };
      listPlaylist(data)
        .then(function (data) {
          console.log(data);
          setState({
            ...state,
            fetched: true,
            playlist: data.data,
            videos: data.videos,
          });
        })
        .catch((err) => {
          console.log(err);
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
      // setState({ ...state, fetched: true, playlist: playlist, videos: videos });
    }
  }, []);
  console.log(state.videos);

  return (
    <div
      className="c-app c-default-layout"
      style={{ display: "flex", height: "100%" }}
    >
      <div
        // sm="3"
        style={{
          position: "fixed",
          marginRight: "auto",
          height: "80%",
          width: "620px",
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CCard
          class="bg-black"
          style={{
            // border: "none",
            // position: "relative",
            // textAlign: "center",
            height: "100%",
          }}
        >
          <CCardBody
            style={{ border: "2px solid #B3272C", borderRadius: "20px" }}
          >
            {state.videos.length !== 0 && (
              <div
              // style={{ width: "100%", height: "100%" }}
              >
                <CImg
                  style={{
                    width: "100%",
                    height: "350px",
                    // cursor: "pointer",
                    // float: "left",
                    marginRight: "1%",
                    borderBottom: "1px solid black",
                    borderRadius: "10px",
                  }}
                  src={state.videos[0].thumb}
                />
              </div>
            )}
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {" "}
              <CCardText
                style={{ width: "100%", height: "100%" }}
                // style={{
                //   position: "absolute",
                //   left: "20%",
                //   bottom: "0",
                //   marginBottom: "-1%",
                //   marginTop: "3%",
                // }}
              >
                {" "}
                <h3>{state.playlist.title}</h3>
                {state.playlist.public ? (
                  <p>
                    Público • {state.videos.length} vídeos •{" "}
                    {`${diffDate(state.today, state.playlist.created_at)}`}
                  </p>
                ) : (
                  <p>
                    Privada • {state.videos.length} vídeos •{" "}
                    {`${diffDate(state.today, state.playlist.created_at)}`}
                  </p>
                )}
                <span style={{ cursor: "pointer" }}></span>{" "}
              </CCardText>{" "}
              {/* <CButton color="info">Editar</CButton> */}
            </div>
          </CCardBody>
        </CCard>
      </div>
      <div
        style={{ marginLeft: "680px", height: "90%", width: "100%" }}
        // sm="9"
      >
        {buildPlaylist()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideos);
