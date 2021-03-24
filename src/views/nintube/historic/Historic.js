//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
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
  CSwitch,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
import HistVideo from "../components/histVideos";
import LogoutPage from "../components/logoutPage";
//Style
//API

const modes = [
  { variant: "outline", shape: "pill", title: "Histórico de exibição" },
  { variant: "outline", shape: "pill", title: "Histórico de enquete" },
  { variant: "outline", shape: "pill", title: "Comentários" },
  { variant: "outline", shape: "pill", title: "Comunidade" },
  { variant: "outline", shape: "pill", title: "Chat ao vivo" },
];
const colors = ["dark"];

const Historic = ({ user, history }) => {
  const [state, setState] = useState({
    fetched: false,
  });
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
    }
  }, []);
  return (
    <div>
      {user != null ? (
        <>
          <h4 align="center">Histórico de Exibição</h4>
          <div style={{ float: "right", width: "20%" }}>
            <CInputGroup>
              <CInputGroupAppend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupAppend>
              <CInput placeholder="Pesquisar no histório de exibição" />
            </CInputGroup>

            <>
              <h4>Tipo de Histórico</h4>
              {modes.map((mode, index) => {
                return (
                  <div
                    className="d-flex justify-content-between my-4"
                    key={index}
                  >
                    <span style={{ color: "white" }}>{mode.title}</span>
                    {colors.map((color, key) => {
                      return (
                        <CSwitch //ALTERAR TIPO DE BOTÃO PARA DE ÚNICA ESCOLHA (Ñ ENCONTRADO NA DOCUMENTAÇÃO DO COREUI)
                          key={key}
                          color={color}
                          checked
                          value={color}
                          {...mode}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </>

            <CButton className="m-2" color="danger">
              LIMPAR TODO O HISTÓRICO DE EXIBIÇÃO
            </CButton>
            <CButton className="m-2" color="danger">
              PAUSAR O HISTÓRICO DE VISUALIZAÇÕES
            </CButton>
            <CButton className="m-2" color="danger">
              GERENCIAR TODAS AS ATIVIDADES
            </CButton>
          </div>
          <HistVideo />
        </>
      ) : (
        <LogoutPage />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Historic);
