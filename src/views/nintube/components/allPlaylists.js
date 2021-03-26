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
import { getPlaylists } from "../../../util/Api";
import { diffDate } from "../../../util/dateDiff";

const videos = [
  {
    id: 1,
    title:
      "FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29",
    total: "1",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 2,
    title:
      "COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02",
    total: "2",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 3,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    total: "62",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 4,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    total: "135",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 5,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    total: "1305",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 6,
    title: "COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01",
    total: "69",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 7,
    title:
      "PRÉ-REQUISITOS | Criando uma Rede Social com React.js e .NET Core #01",
    total: "232",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 8,
    title:
      "GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04",
    total: "150",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
];

const AllPlaylists = ({ user }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    fetched: false,
    videos: [],
    today: new Date(),
  });
  let history = useHistory();
  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };
  useEffect(() => {
    if (!state.fetched) {
      var data = {
        id_target: id !== "0" ? id : "",
        token: user.token,
      };
      getPlaylists(data)
        .then(function (data) {
          console.log(data);
          setState({ ...state, fetched: true, videos: data });
        })
        .catch((err) => {
          console.log(err);
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
    }
  }, []);
  return (
    <div>
      <CContainer fluid>
        <CRow>
          {state.videos.map((item, index) => (
            <CCol style={{ width: "5%" }} sm="2">
              <CCard style={{ border: "2px solid #B3272C" }}>
                <div
                  // className="style-scope ytd-grid-playlist-renderer"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                  // className="yt-simple-endpoint style-scope ytd-playlist-thumbnail"
                  >
                    <CImg
                      onClick={() => handleClick("view", item.id)}
                      style={{
                        width: "100%",
                        height: "150px",
                        cursor: "pointer",
                        borderBottom: "1px solid black",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                      src={
                        item.thumb === "undefined"
                          ? "https://i.ytimg.com/img/no_thumbnail.jpg"
                          : item.thumb
                      }
                    />
                  </div>
                  <div
                    // className="style-scope ytd-playlist-thumbnail"
                    style={{
                      width: "50%",
                      height: "100%",
                      fontSize: "20px",
                      color: "white",
                      position: "absolute",
                      right: 0,
                      top: 0,
                      backgroundColor: "rgb(8 8 8 / 80%)",

                      display: "flex",
                    }}
                  >
                    <div
                      className="text-center"
                      style={{
                        // marginBottom: "auto",
                        // marginTop: "auto",
                        margin: "auto",
                        // flexDirection: "row",
                      }}
                    >
                      <span>{item.all_videos}</span>
                      <div>
                        <CIcon size="2xl" name="cilMenu"></CIcon>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <CCardBody style={{ fontSize: "80%" }}>
                    <h3
                      onClick={() => handleClick("view", item.id)}
                      style={{ fontSize: "120%", cursor: "pointer" }}
                    >
                      {item.name}
                    </h3>{" "}
                    <div>
                      {`${diffDate(state.today, item.created_at)}`}
                      <br />
                      <span
                        onClick={() => handleClick("playlist", item.id)}
                        style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                      >
                        Ver Playlist Completa
                      </span>
                    </div>
                    {/* <CCardText
                      style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("channel", item.id)}
                      >
                        {item.channel}
                      </span>
                      <CCardText
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >{`${item.views} • ${item.date}`}</CCardText>{" "}
                    </CCardText> */}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AllPlaylists));
