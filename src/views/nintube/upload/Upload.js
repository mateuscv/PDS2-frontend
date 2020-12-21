import React, { useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
import CIcon from "@coreui/icons-react";
//CoreUI
import { CInput, CTextarea, CCard, CFormGroup, CCol } from "@coreui/react";
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
  });
  const onDrop = (files) => {
    setState({
      ...state,
      error: "",
      message: "Fazendo upload do video...",
    });
    const data = new FormData();
    var video = files[0];

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
    console.log(token);
    if (!video || !state.description || !state.title) {
      setState({
        ...state,
        error: "Campos não podem ficar em branco!",
        message: "",
      });
    } else {
      data.append("file", video);
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
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
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
      {state.msg}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
