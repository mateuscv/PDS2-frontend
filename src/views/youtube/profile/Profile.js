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
      avatar: null,
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      password_new: "",
      birthdate: "",
      gender: "",
      phone: "",
    },
    error: "",
    message: "",
  });
  const profile = (e) => {
    e.preventDefault();
    setState({ ...state, error: "", message: "Alterando..." });
    
    const data = new FormData();
    data.append("avatar", state.avatar);
    const values = {
      username: state.user.username,
      email: state.user.email,
      password: md5(state.user.password),
      birthdate: state.user.birthdate,
      gender: state.user.gender,
      phone: state.userphone,
    };
    var password = "";

    if (
      !state.user.username ||
      !state.user.email ||
      !state.user.birthdate ||
      !state.user.gender ||
      !state.user.phone
    ) {
      setState({
        ...state,
        error: "Por favor, inserir valores em todos os campos",
        message: "",
      });
    } else if (state.user.password_confirm !== state.user.password_new) {
      setState({ 
        ...state, 
        error: "As senhas não batem. Tente novamente!",
        message: "" 
      });
    } else {
      if (state.user.password_new == "" || state.user.password_new == null){
        password = state.user.password;
      } else {
        password = md5(state.user.password_new);
      }
      console.log(values);
      data.append("token", token);
      data.append("old_img", state.user.avatar);
      data.append("username", state.user.username);
      data.append("email", state.user.email);
      data.append("password", md5(state.user.password));
      data.append("birthdate", state.user.birthdate);
      data.append("gender", state.user.gender);
      data.append("phone", state.user.phone);

      editProfile(data, token)
        .then(function (data) {
          console.log(data)
          if (data.status === 1) {
            setState({
              ...state,
              error: "Perfil atualizado!",
              message: "",
            });
          } else {
            setState({
              ...state,
              error: "Algo deu errado tentar novamente!",
              message: "",
            });
          }
        })
        .catch((err) => {
          console.log(err)
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
    }
  };

  useEffect(() => {
    if (!state.fetched) {
      console.log(token);
      var data = { token: token };
      getProfile(data, token).then(function (data) {
        console.log(data.birthdate.substring(0,10));
        setState({ ...state, user: data, fetched: true });
      });
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
              <div class="c-avatar">
              
              </div>
              <CFormGroup>
                <CCol md="12">
                  {/* <label>
                    Selecione seu Avatar */}
                  <img style={{ width: "50px" }} src={ state.user.avatar } alt="avatar"></img>
                  { console.log(state) }
                  <CInput
                    type="file"
                    onChange={(e) => {
                    setState({ ...state, avatar: e.target.files[0] });
                  }}
                  />
                  {/* </label> */}
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-username">Nome de usário</CLabel>
                <CInput
                  type="text"
                  id="nf-username"
                  name="nf-username"
                  autoComplete="name"
                  value={state.user.username}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.username = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-gender">Gênero</CLabel>
                <CSelect
                  value={state.user.gender}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.gender = e.target.value;
                    setState({ ...state, user });
                  }}
                >
                  <option value="m">Masculino</option>
                  <option value="w">Feminino</option>
                  <option value="a">Outros</option>
                </CSelect>
              </CFormGroup>
              
              <CFormGroup>
                <CLabel htmlFor="nf-birthdate">Data de Nascimento</CLabel>
                <CInput
                  type="date"
                  id="nf-birthdate"
                  name="nf-birthdate"
                  autoComplete="birthdate"
                  value={state.user.birthdate.substring(0,10)}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.birthdate = e.target.value;
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
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.password_new = e.target.value;
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
