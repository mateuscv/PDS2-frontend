import React from "react";
import {
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
  CImg
} from "@coreui/react";
// import { Container } from './styles';

const videos = [
  {
    id: 1,
    title:
      'FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29',
    channel: 'Lucas Nhimi',
    views: '11 mi de visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 2,
    title:
      'COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02',
    channel: 'Lucas Nhimi',
    views: '957 mil visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 3,
    title:
      'CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27',
    channel: 'Lucas Nhimi',
    views: '106 mil visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 4,
    title:
      'CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27',
    channel: 'Lucas Nhimi',
    views: '5,6 mi de visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 5,
    title:
      'EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26',
    channel: 'Lucas Nhimi',
    views: '2,2 mi de visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 6,
    title: 'COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01',
    channel: 'Lucas Nhimi',
    views: '233 mil visualizações',
    date: 'há 1 semana',
    avatar: '/images/avatar.jpeg',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 7,
    title:
      'PRÉ-REQUISITOS | Criando uma Rede Social com React.js e .NET Core #01',
    channel: 'Lucas Nhimi',
    views: '118 mil visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
  {
    id: 8,
    title:
      'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
    channel: 'Lucas Nhimi',
    views: '1,9 mi de visualizações',
    date: 'há 1 semana',
    thumb: 'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg',
  },
];

const youtube = ({ history }) => {
  const handleClick = () => {
    history.push("/view");
  };

  return (
    <div>
      <h1>Home</h1>
      <CButton onClick={() => handleClick()}>View</CButton>

      <CContainer fluid>
        <CRow>
          {videos.map((item, index) => (

            <CCol sm="4">
              <CCard>
                <CImg
                  style={{ width: '100%' }}
                  src={item.thumb}
                />
                <CCardBody>
                  <CCardSubtitle>
                    {item.title}
                  </CCardSubtitle>
                  <CCardText>
                    {item.channel}
                  </CCardText>
                  <CCardText>
                    {`${item.views} • ${item.date}`}
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>

          ))}
        </CRow>
      </CContainer>

    </div>
  );
};

export default youtube;
