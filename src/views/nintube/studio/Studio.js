//REACT
import React, { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CCardHeader,
  CCard,
  CCardBody,
  CDataTable,
  CBadge,
  CButton,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
import { deletVideo } from "../../../util/Api";
//Style
//API
import data from "./data";
import { myVideos } from "../../../util/Api";

const fields = [
  { key: "thumb", _style: { width: "20%" }, sorter: false, filter: false },
  { key: "title", _style: { width: "35%" } },
  {
    key: "privacy",
    _style: { width: "5%" },

    filter: false,
  },
  { key: "created_at", _style: { width: "40%" } },
  {
    key: "Editar",
    label: "",

    sorter: false,
    filter: false,
  },
  {
    key: "Deletar",
    label: "",
    sorter: false,
    filter: false,
  },
];

const Studio = ({ user, history }) => {
  const [state, setState] = useState({
    fetched: false,
    videos: "",
  });
  const Delet = (video_id) => {
    var data = { token: user.token, video_id: video_id };
    deletVideo(data)
      .then(function (data) {
        alert("Ação", "Video foi deletado com sucesso!");
      })
      .catch((err) => {
        alert(
          "Ação",
          "Ouve algume erro ao deletar o video, por favor tentar novamente mais tarde!"
        );
      });
  };

  useEffect(() => {
    if (!state.fetched) {
      console.log(user.token);
      var data = { token: user.token };
      myVideos(data)
        .then(function (data) {
          console.log(data);
          setState({ ...state, fetched: true, videos: data[0] });
        })
        .catch((err) => {
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
      // setState({ ...state, fetched: true });
    }
  }, []);

  return (
    <div>
      <CButton color="success" onClick={() => history.push("/upload")}>
        <CIcon name="cil-cloud-upload" /> Enviar Vídeo
      </CButton>
      <CCard>
        <CCardHeader>Conteúdo do Canal</CCardHeader>
        <CCardBody>
          <CDataTable
            items={state.videos}
            fields={fields}
            hover
            striped
            columnFilter
            itemsPerPageSelect
            itemsPerPage={5}
            sorter
            // dark="true"
            pagination
            scopedSlots={{
              Thumb: (item) => (
                <td>
                  <img
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      borderBottom: "1px solid black",
                      borderRadius: "10px",
                    }}
                    src={item.thumb}
                  />
                </td>
              ),
              Editar: (item) => (
                <td className="align-middle">
                  <CButton
                    title="Editar"
                    color="btn btn-ghost-dark"
                    onClick={() => history.push("/edit/upload/" + item.id)}
                  >
                    <CIcon name="cil-pencil" />
                  </CButton>
                </td>
              ),
              Deletar: (item) => (
                <td className="align-middle">
                  <CButton
                    color="btn btn-ghost-danger"
                    title="Deletar"
                    onClick={() => Delet(item.id)}
                  >
                    <CIcon name="cil-trash" />
                  </CButton>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Studio);
