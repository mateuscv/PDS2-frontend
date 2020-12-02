//REACT
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
//API
import { registerUser } from "../../util/Api";
import md5 from "md5";

const Register = ({ history }) => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    error: "",
    message: "",
  });
  const register = (e) => {
    e.preventDefault();
    setState({ ...state, error: "", message: "Registrando..." });
    const data = {
      first_name: state.first_name.trim(),
      last_name: state.last_name,
      email: state.email,
      password: md5(state.password),
      created_at: "1",
    };
    // const data = {
    //   first_name: "Igor",
    //   last_name: "Oliveira",
    //   email: "igor@furg.br",
    //   password: "senha2",
    //   created_at: "1",
    // };
    if (!data.first_name || !data.last_name || !data.email || !data.password) {
      setState({
        ...state,
        error: "Insira os dados corretamente!",
        message: "",
      });
    } else if (md5(state.password_confirm) !== data.password) {
      setState({ ...state, error: "As senhas não batem!", message: "" });
    } else {
      registerUser(data).then(function (data) {
        history.push("/login");
      });
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs="12" md="5">
            <CCard>
              <CCardBody>
                <CForm>
                  <h1>Register</h1>
                  {state.message && (
                    <CCard
                      className="border-success"
                      style={{ textAlign: "center" }}
                    >
                      {state.message}
                    </CCard>
                  )}
                  {state.error && (
                    <CCard
                      className="border-danger"
                      style={{ textAlign: "center" }}
                    >
                      {state.error}
                    </CCard>
                  )}
                  <p className="text-muted">Create your account</p>
                  <CFormGroup row>
                    <CCol md="6">
                      <CInput
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => {
                          setState({ ...state, first_name: e.target.value });
                        }}
                      />
                    </CCol>
                    <CCol md="6">
                      <CInput
                        type="text"
                        placeholder="Sobrenome"
                        onChange={(e) => {
                          setState({ ...state, last_name: e.target.value });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CInput
                        type="email"
                        placeholder="Seu endereço de Email"
                        onChange={(e) => {
                          setState({ ...state, email: e.target.value });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CInput
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => {
                          setState({ ...state, password: e.target.value });
                        }}
                      />
                    </CCol>
                    <CCol md="6">
                      <CInput
                        type="password"
                        placeholder="Confirmar"
                        onChange={(e) => {
                          setState({
                            ...state,
                            password_confirm: e.target.value,
                          });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <Link to="/login">
                    <p color="primary" className="mt-3" active tabIndex={-1}>
                      Login
                    </p>
                  </Link>
                  <CButton onClick={(e) => register(e)} color="success" block>
                    Criar Conta
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Register);
