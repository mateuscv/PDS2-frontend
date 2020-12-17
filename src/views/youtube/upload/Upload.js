import React, { useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
import CIcon from "@coreui/icons-react";
//API
import { uploadVideo } from "../../util/Api";
import Dropzone from "react-dropzone";

const creds = {
  file: null,
};

const Upload = ({ token }) => {
  const [state, setState] = useState({
    upload: "",
  });
  const onDrop = (files) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("title", "titulo");
    data.append("description", "descrição");

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
    uploadVideo(data, token).then(function (data) {
      console.log(data);
    });

    // axios.post("http://localhost:8000/upload", data).then(function (data) {
    //   // then print response status
    //   console.log(data);
    //   if (data.status === 200) {
    //     setState({ ...state, msg: "Upload Completo!" });
    //   } else {
    //     setState({
    //       ...state,
    //       msg: "Tivemos um problema, tente novamente!",
    //     });
    //   }
    // });
  };

  return (
    <div>
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
