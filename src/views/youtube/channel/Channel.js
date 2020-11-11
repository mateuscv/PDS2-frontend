import React from "react";
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
import ShowVideos from "../containers/showVideos";
// import { Container } from './styles';

const Channel = () => {
  return (
    <div id="test">
      <header style={{ marginTop: "0%" }}>
        <CImg
          style={{ width: "100%" }}
          src={
            "https://cdn.discordapp.com/attachments/300483456440336385/775913742943911936/unknown.png"
          }
        ></CImg>
        <CCard style={{ height: "100px" }}>
          <CCardBody style={{ width: "100%" }}>
            <CCardSubtitle>Manual do Mundo</CCardSubtitle>
            <CRow>
              <CCol sm="2">
                <CButton>Início</CButton>
              </CCol>
              <CCol sm="2">
                <CButton>Vídeos</CButton>
              </CCol>
              <CCol sm="2">
                <CButton>Playlists</CButton>
              </CCol>
              <CCol sm="2">
                <CButton>Comunidade</CButton>
              </CCol>
              <CCol sm="2">
                <CButton>Canais</CButton>
              </CCol>
              <CCol sm="2">
                <CButton>Sobre</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </header>
      <ShowVideos />
    </div>
  );
};

export default Channel;
