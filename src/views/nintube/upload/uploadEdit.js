import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CInput,
  CTextarea,
  CCard,
  CFormGroup,
  CCol,
  CSwitch,
  CButton,
  CRow,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
import Player from "../components/Player";
//Style
import "../styles/nintube.css";
//API
import { getUploadVideo, editUploadVideo } from "../../../util/Api";
import Dropzone from "react-dropzone";
import dataVideo from "./data";

const creds = {
  file: null,
};

const UploadEdit = ({ token }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    description: "",
    title: "",
    privacy: "",
    file: null,
    file_name: "",
    fetched: false,
    video_url: "",
    thumb: "",
  });
  const onDrop = (files) => {
    setState({ ...state, file: files[0], file_name: files[0].path });

    // const options = {
    //   onUploadProgess: (progressEvent) => {
    //     const { loaded, total } = progressEvent;
    //     let percent = Math.floor((loaded * 100) / total);
    //     console.log("entro");
    //     console.log(`${loaded}kb of ${total}kb | ${percent}%`);
    //     // if (percent < 100) {
    //     //   setState({ ...state, upload_percent: percent });
    //     // }
    //   },
    // };
  };

  const editVideo = () => {
    setState({
      ...state,
      error: "",
      message: "Salvando as alterações...",
    });
    console.log(state.file);
    console.log(state.description);
    console.log(state.title);
    const data = new FormData();
    if (!state.file || !state.description || !state.title) {
      setState({
        ...state,
        error: "Campos não podem ficar em branco!",
        message: "",
      });
    } else {
      var type_video = state.file.type.split("/");
      if (type_video[0] !== "video") {
        setState({
          ...state,
          error: "Formato do video está errado!",
          message: "",
        });
      } else {
        data.append("file", state.file);
        data.append("title", state.title);
        data.append("description", state.description);
        editUploadVideo(data, token)
          .then(function (data) {
            setState({
              ...state,
              error: "",
              message: "Alterações salvas com sucesso!",
            });
          })
          .catch((err) => {
            console.log(err);
            setState({
              ...state,
              error: "Algum erro aconteceu, tente novamente mais tarde!",
              message: "",
            });
          });
      }
    }
  };

  useEffect(() => {
    if (!state.fetched) {
      var data = { id: id };
      console.log(data);
      // getUploadVideo(data)
      //   .then(function (data) {
      //     //console.log(user);
      //     // console.log(data.token);
      //     // console.log(data);
      setState({
        ...state,
        fetched: true,
        description: dataVideo.description,
        title: dataVideo.title,
        privacy: dataVideo.privacy,
        thumb: dataVideo.thumb,
        video_url: dataVideo.link,
        file_name: "Nome do video",
      });

      //   })
      //   .catch((err) => {
      //     setState({ ...state, error: "Dados inválidos", message: "" });
      //   });
    }
  }, []);
  return (
    <div>
      {state.message && (
        <CCard className="border-success" style={{ textAlign: "center" }}>
          {state.message}
        </CCard>
      )}
      {state.error && (
        <CCard className="border-danger" style={{ textAlign: "center" }}>
          {state.error}
        </CCard>
      )}
      <CRow>
        <CCol sm="4">
          <CFormGroup row style={{ width: "100%" }}>
            <CCol md="12">
              <CInput
                placeholder="Titulo"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row style={{ width: "100%" }}>
            <CCol md="12">
              <CTextarea
                placeholder="Descrição"
                value={state.description}
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
              />
            </CCol>
          </CFormGroup>
          <div
            style={{
              color: "white",
              display: "flex",
              // justifyContent: "space-between",
            }}
          >
            {" "}
            <CSwitch
              className={"mx-1"}
              color={"info"}
              checked={state.privacy}
              onChange={(e) =>
                setState({ ...state, privacy: e.target.checked })
              }
            />
            {state.privacy ? "Privado" : "Publico"}
          </div>
          <CImg src={state.thumb} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <CIcon name="cilDataTransferUp" />
                </div>
              )}
            </Dropzone>
          </div>
          <p style={{ color: "white" }}>{state.file_name}</p>
          <CButton
            style={{ color: "white", width: "50%", border: "1px solid red" }}
            onClick={() => editVideo()}
          >
            Enviar
          </CButton>
        </CCol>
        <CCol sm="8">
          <Player />
        </CCol>
      </CRow>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadEdit);
