import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";

// import { Container } from './styles';

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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 6,
    title: "COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01",
    channel: "Lucas Nhimi",
    views: "233 mil visualizações",
    date: "há 1 semana",
    avatar: "avatars/7.jpg",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
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
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
];

const HomeVideos = ({}) => {
  const [state, setState] = useState({
    fetched: false,
  });

  let history = useHistory();
  const handleClick = (route) => {
    history.push("/" + route);
  };
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
      console.log("oi");
    }
  }, []);
  return (
    <div>
      <CContainer fluid>
        <CRow>
          {videos.map((item, index) => (
            <CCol style={{ width: "5%" }} sm="2">
              <CCard>
                <CImg
                  onClick={() => handleClick("view")}
                  style={{ width: "100%", cursor: "pointer" }}
                  src={item.thumb}
                />
                <div>
                  <CCardBody style={{ fontSize: "80%" }}>
                    <h3
                      onClick={() => handleClick("view")}
                      style={{ fontSize: "120%", cursor: "pointer" }}
                    >
                      {item.title}
                    </h3>{" "}
                    <CCardText
                      style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("channel")}
                      >
                        {item.channel}
                      </span>
                      <CCardText
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view")}
                      >{`${item.views} • ${item.date}`}</CCardText>{" "}
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

export default HomeVideos;
