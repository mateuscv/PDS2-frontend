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
//Style
//API
import data from "./data";

const fields = [
  { key: "Thumb", _style: { width: "20%" }, sorter: false, filter: false },
  { key: "Titulo", _style: { width: "35%" } },
  {
    key: "Visibilidade",
    _style: { width: "5%" },

    filter: false,
  },
  { key: "Restrições", filter: false },
  { key: "Data", _style: { width: "40%" } },
  { key: "Visualizações", filter: false },
  {
    key: "Comentários",
    classes: "centerTd",
    filter: false,
  },
  { key: "Likes", filter: false },
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

const Studio = ({ history }) => {
  return (
    <div>
      <CButton color="success" onClick={() => history.push("/upload")}>
        <CIcon name="cil-cloud-upload" /> Enviar Vídeo
      </CButton>
      <CCard>
        <CCardHeader>Conteúdo do Canal</CCardHeader>
        <CCardBody>
          <CDataTable
            items={data}
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
                  <CImg
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      borderBottom: "1px solid black",
                      borderRadius: "10px",
                    }}
                    src={item.Thumb}
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
              Deletar: () => (
                <td className="align-middle">
                  <CButton
                    color="btn btn-ghost-danger"
                    title="Deletar"
                    onClick={() => history.push("/upload")}
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

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Studio);
