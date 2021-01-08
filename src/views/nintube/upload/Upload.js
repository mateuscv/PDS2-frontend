import React, { useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
import CIcon from "@coreui/icons-react";
//CoreUI
import {
  CInput,
  CTextarea,
  CCard,
  CFormGroup,
  CCol,
  CSwitch,
  CButton,
} from "@coreui/react";
//Componets
//Style
import "../styles/nintube.css";
//API
import { uploadVideo } from "../../../util/Api";
import Dropzone from "react-dropzone";

const creds = {
  file: null,
};

const Upload = ({ token }) => {
  const [state, setState] = useState({
    upload: "",
    description: "",
    title: "",
    privacy: "",
    file: null,
    file_name: "",
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
  const sendVideo = () => {
    setState({
      ...state,
      error: "",
      message: "Fazendo upload do video...",
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
        uploadVideo(data, token)
          .then(function (data) {
            setState({
              ...state,
              error: "",
              message: "Video criado com sucesso!",
            });
          })
          .catch((err) => {
            console.log(err);
            setState({ ...state, error: "Dados inválidos", message: "" });
          });
      }
    }
  };

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
      <CFormGroup row style={{ width: "50%" }}>
        <CCol md="12">
          <CInput
            placeholder="Titulo"
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
        </CCol>
      </CFormGroup>
      <CFormGroup row style={{ width: "50%" }}>
        <CCol md="12">
          <CTextarea
            placeholder="Descrição"
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
          onChange={(e) => setState({ ...state, privacy: e.target.checked })}
        />
        {state.privacy ? "Privado" : "Publico"}
      </div>
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
        style={{ color: "white", border: "1px solid red" }}
        onClick={() => sendVideo()}
      >
        Enviar
      </CButton>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
