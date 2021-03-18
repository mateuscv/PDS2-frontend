import React, { useState, useEffect } from "react";
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
  CImg,
} from "@coreui/react";
//Componets
//Style
import "../styles/nintube.css";
//API
import { uploadVideo } from "../../../util/Api";
import { alert } from "../../../util/alertApi";
import Dropzone from "react-dropzone";

const Upload = ({ user, history }) => {
  const [state, setState] = useState({
    upload: "",
    description: "",
    title: "",
    privacy: false,
    video: null,
    video_name: "",
    thumb: null,
    fetched: false,
    image: "",
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

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        const data = {
          title: state.title,
          file: await toBase64(state.video),
          thumb: await toBase64(state.thumb),
          description: state.description,
          privacy: state.privacy,
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

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setState({
        ...state,
        thumb: event.target.files[0],
        image: URL.createObjectURL(event.target.files[0]),
      });
      // var thumb = event.target.files[0];
      // var thumb_name = event.target.files[0].name;
      // let reader = new FileReader();
      // reader.onload = (e) => {
      //   setState({
      //     ...state,
      //     thumb: thumb,
      //     thumb_name: thumb_name,
      //     image: e.target.result,
      //   });
      // };
      // reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (!state.fetched) {
      if (!user) {
        alert(
          "Houve um problema",
          "Você não está logado para realizar essa ação por favor realize o login.",
          [
            {
              label: "Cancelar",
              onClick: () => {
                history.push("/home");
              },
            },
            {
              label: "Login",
              onClick: () => {
                history.push("/login");
              },
            },
          ]
        );
      }
      setState({ ...state, fetched: true });
    }
  }, []);

  return (
    <div style={{ border: "1px solid white", borderRadius: "10px" }}>
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
      <CFormGroup
        row
        style={{
          width: "95%",
          marginLeft: "2%",
          marginTop: "1%",
        }}
      >
        <CCol md="6">
          <h3 style={{ color: "white" }}>Título</h3>
          <CInput
            // style={{ height: "100%" }}
            // placeholder="Titulo"
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
        </CCol>
        <CCol md="6">
          <h3 style={{ color: "white" }}>Descrição</h3>
          <CTextarea
            // placeholder="Descrição"
            // style={{ height: "140%" }}
            onChange={(e) =>
              setState({
                ...state,
                description: e.target.value,
              })
            }
          />
        </CCol>
      </CFormGroup>
      {/* <CFormGroup row style={{ width: "50%" }}>
        <CCol md="12">
          <CTextarea
            placeholder="Descrição"
            style={{ height: "140%" }}
            onChange={(e) =>
              setState({
                ...state,
                description: e.target.value,
              })
            }
          />
        </CCol>
      </CFormGroup> */}
      <CFormGroup row style={{ marginLeft: "2%" }}>
        <CCol md="6">
          <div
            align="center"
            style={{
              color: "white",
              display: "flex",

              // justifyContent: "space-between",
            }}
          >
            Privado{" "}
            <CSwitch
              className={"mx-1"}
              color={"info"}
              onChange={(e) =>
                setState({ ...state, privacy: e.target.checked })
              }
            />
            <div>
              <label className="fileThumb" for="file_thumb">
                Selecione a imagem para a thumb &#187;
              </label>
              <input
                id="file_thumb"
                onChange={(e) => onImageChange(e)}
                type="file"
              ></input>{" "}
            </div>
          </div>
          {/* <div style={{ color: "white" }}> */}
          <div align="center">
            <img style={{ width: "50%" }} src={state.image} />
          </div>
          {/* </div> */}
        </CCol>
        <CCol md="6">
          <div style={{}}>
            <h3 style={{ color: "white", alignItems: "center" }}>
              Arraste ou Selecione o video abaixo!
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
          </div>
          <p style={{ color: "white" }}>{state.video_name}</p>
        </CCol>
      </CFormGroup>

      <div align="center" style={{ marginBottom: "1%" }}>
        <CButton
          style={{ color: "white", border: "1px solid red" }}
          onClick={() => sendVideo()}
        >
          Enviar
        </CButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
