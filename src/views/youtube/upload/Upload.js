import React, { useState } from "react";

import CIcon from "@coreui/icons-react";

import Dropzone from "react-dropzone";
import axios from "axios";
const creds = {
  file: null,
};

const Upload = () => {
  const [state, setState] = useState({
    upload: "",
  });
  const onDrop = (files) => {
    const data = new FormData();
    data.append("file", files[0]);

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

    axios.post("http://localhost:8000/upload", data).then(function (data) {
      // then print response status
      console.log(data);
      if (data.status === 200) {
        setState({ ...state, msg: "Upload Completo!" });
      } else {
        setState({
          ...state,
          msg: "Tivemos um problema, tente novamente!",
        });
      }
    });
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
export default Upload;
