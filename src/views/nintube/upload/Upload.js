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
  CLabel,
} from "@coreui/react";
//Componets
//Style
import "../styles/nintube.css";
//API
import { uploadVideo } from "../../../util/Api";
import Dropzone from "react-dropzone";

const Upload = ({ user }) => {
  const [state, setState] = useState({
    upload: "",
    description: "",
    title: "",
    privacy: false,
    video: null,
    video_name: "",
    thumb: null,
  });
  const onDrop = (files) => {
    setState({ ...state, video: files[0], video_name: files[0].path });

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
  const sendVideo = async () => {
    setState({
      ...state,
      error: "",
      message: "Fazendo upload do video...",
    });
    // console.log(state.thumb);
    // console.log(state.video);
    // console.log(state.description);
    // console.log(state.title);
    // const data = new FormData();
    if (!state.video || !state.description || !state.title || !state.thumb) {
      setState({
        ...state,
        error: "Campos não podem ficar em branco!",
        message: "",
      });
    } else {
      var type_video = state.video.type.split("/");
      if (type_video[0] !== "video") {
        setState({
          ...state,
          error: "Formato do video está errado!",
          message: "",
        });
      } else {

        /*const data = new FormData();
        data.append("file", state.video);
        data.append("title", state.title);
        data.append("description", state.description);
        data.append("privacy", state.privacy);
        data.append("thumb", state.thumb);

        console.log(data);*/

        /*var data = {
          file: state.video,
          title: state.title,
          description: state.description,
          privacy: state.privacy,
          thumb: state.thumb,
        };*/

        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });

        const data = {
          title: state.title,
          file: await toBase64(state.video),
          thumb: await toBase64(state.thumb),
          description: state.description,
          privacy: state.privacy
        };

        console.log(data);

        //submitForm("application/json", data, (msg) => console.log(msg));


        uploadVideo(data, user.token)
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
      <div>
        <label className="fileThumb" for="file_thumb">
          Selecione a imagem para a thumb &#187;
        </label>
        <input
          id="file_thumb"
          onChange={(e) =>
            setState({
              ...state,
              thumb: e.target.files[0],
              thumb_name: e.target.files[0].name,
            })
          }
          type="file"
        ></input>{" "}
        <span style={{ color: "white" }}>{state.thumb_name}</span>
      </div>
      <h3>Arraste ou Selecione o video abaixo!</h3>
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
      <p style={{ color: "white" }}>{state.video_name}</p>
      <CButton
        style={{ color: "white", border: "1px solid red" }}
        onClick={() => sendVideo()}
      >
        Enviar
      </CButton>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
