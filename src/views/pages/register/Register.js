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
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
//API
import { registerUser } from "../../util/Api";
import md5 from "md5";
import MaskedInput from "react-text-mask";

const Register = ({ history }) => {
  const [state, setState] = useState({
    avatar: null,
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    error: "",
    message: "",
    birthdate: "",
    gender: "",
    telephone: "",
  });
  const register = (e) => {
    e.preventDefault();
    setState({ ...state, error: "", message: "Registrando..." });

    const data = new FormData();
    data.append("avatar", state.avatar);
    const values = {
      username: state.username,
      email: state.email,
      password: md5(state.password),
      birthdate: state.birthdate,
      gender: state.gender,
      phone: state.phone,
    };

    data.append("username", state.username);
    data.append("email", state.email);
    data.append("password", md5(state.password));
    data.append("birthdate", state.birthdate);
    data.append("gender", state.gender);
    data.append("phone", state.phone);

    console.log(data);
    registerUser(data).then(function (data) {
      // history.push("/login");
      if (data.status === 1) {
        history.push("/login");
      }
      console.log(data);
    });
    // }
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
                    <CCol md="12">
                      {/* <label>
                        Selecione seu Avatar */}
                      <CInput
                        type="file"
                        onChange={(e) => {
                          setState({ ...state, avatar: e.target.files[0] });
                        }}
                      />
                      {/* </label> */}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CInput
                        type="text"
                        placeholder="Username"
                        onChange={(e) => {
                          setState({ ...state, username: e.target.value });
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
                        placeholder="Confirmar Senha"
                        onChange={(e) => {
                          setState({
                            ...state,
                            password_confirm: e.target.value,
                          });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CInput
                        type="date"
                        onChange={(e) => {
                          setState({ ...state, birthdate: e.target.value });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <MaskedInput
                        mask={[
                          "(",
                          /[1-9]/,
                          /\d/,
                          ")",
                          " ",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        id="nf-phone"
                        name="nf-phone"
                        value={state.phone}
                        placeholder="(53) 99999-9999"
                        className="form-control"
                        onChange={(e) => {
                          setState({ ...state, phone: e.target.value });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CSelect
                        value={state.gender}
                        onChange={(e) => {
                          setState({ ...state, gender: e.target.value });
                        }}
                      >
                        {" "}
                        <option value=""> Selecione o Genero </option>
                        <option value="m">Masculino</option>
                        <option value="w">Feminino</option>
                        <option value="a">Outros</option>
                      </CSelect>
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
