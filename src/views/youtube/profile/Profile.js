//REACT
import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CContainer,
  CCard,
  CRow,
  CCol,
  CForm,
  CSelect,
  CFormText,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CLabel,
  CInput,
  CFormGroup,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
  CImg,
} from "@coreui/react";
//Componets
//Style
//API
import { getProfile, editProfile } from "../../util/Api";
import md5 from "md5";
import MaskedInput from "react-text-mask";

const Profile = ({ token }) => {
  const [state, setState] = useState({
    fetched: false,
    user: {
      photo: "",
      name: "",
      genre: "",
      email: "",
      password: "",
      password_confirm: "",
      birth_date: "",
      phone: "",
    },
    error: "",
    message: "",
  });
  const profile = (e) => {
    e.preventDefault();
    setState({ ...state, error: "", message: "Alterando..." });
    const data = {
      photo: state.photo,
      name: state.name.trim(),
      genre: state.genre,
      email: state.email,
      password: md5(state.password),
      birth_date: state.birth_date,
      phone: state.phone,
    };
    if (
      !data.photo ||
      !data.name ||
      !data.genre ||
      !data.email ||
      !data.password ||
      !data.birth_date ||
      !data.phone
    ) {
      setState({
        ...state,
        error: "Insira os dados corretamente!",
        message: "",
      });
    } else if (md5(state.password_confirm) !== data.password) {
      setState({ ...state, error: "As senhas não batem!", message: "" });
    }
  };

  useEffect(() => {
    if (!state.fetched) {
      console.log(token);
      var data = { token: token };
      getProfile(data).then(function (data) {});
      // const user = {
      //   name: "Igor Oliveira",
      //   genre: "a",
      //   email: "igor@furg.br",
      //   password: "123456",
      //   birth_date: "24/11/1997",
      //   phone: "(53) 98436-6433",
      // };
      setState({ ...state, fetched: true });
    }
  }, []);

  return (
    <div>
      <div align="center">
        <h1>Informações pessoais</h1>
        Informações básicas, como seu nome e foto, usadas nos serviços
      </div>

      <h4>Perfil</h4>

      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post">
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

              <CFormGroup>
                <CLabel htmlFor="nf-first_name">Nome</CLabel>
                <CInput
                  type="text"
                  id="nf-first_name"
                  name="nf-first_name"
                  autoComplete="name"
                  value={state.user.name}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.name = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-genre">Gênero</CLabel>
                <CSelect
                  value={state.user.genre}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.genre = e.target.value;
                    setState({ ...state, user });
                  }}
                >
                  <option value="m">Masculino</option>
                  <option value="w">Feminino</option>
                  <option value="a">Outros</option>
                </CSelect>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-birth_date">Data de Nascimento</CLabel>
                <CInput
                  type="date"
                  id="nf-birth_date"
                  name="nf-birth_date"
                  autoComplete="birth_date"
                  value={state.user.birth_date}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.birth_date = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password">Senha</CLabel>
                <CInput
                  type="password"
                  id="nf-password"
                  name="nf-password"
                  autoComplete="current-password"
                  value={state.user.password}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.password = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password_confirm">Confirme a senha</CLabel>
                <CInput
                  type="password"
                  id="nf-password_confirm"
                  name="nf-password_confirm"
                  autoComplete="password_confirm"
                  value={state.user.password_confirm}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.password_confirm = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>

      <h4>Informações de contato</h4>

      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel htmlFor="nf-email">E-mail</CLabel>
                <CInput
                  type="email"
                  id="nf-email"
                  name="nf-email"
                  autoComplete="email"
                  value={state.user.email}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.email = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-phone">Telefone</CLabel>
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
                  autoComplete="phone"
                  value={state.user.phone}
                  className="form-control"
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.phone = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <div align="center">
                <CButton
                  style={{ width: "10%" }}
                  onClick={(e) => profile(e)}
                  color="success"
                  block
                >
                  Alterar informações
                </CButton>
              </div>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
