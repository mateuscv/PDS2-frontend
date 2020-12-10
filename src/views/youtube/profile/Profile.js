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
      const user = {
        name: "Igor Oliveira",
        genre: "a",
        email: "igor@furg.br",
        password: "123456",
        birth_date: "24/11/1997",
        phone: "(53) 98436-6433",
      };
      // const gender = {
      //   man: false,
      //   woman: false,
      //   another: false,
      // };
      // switch (user.genre) {
      //   case "m":
      //     gender.man = true;
      //     break;
      //   case "w":
      //     gender.woman = true;
      //     break;
      //   case "a":
      //     gender.another = true;
      //     break;
      //   default:
      //     break;
      // }
      setState({ ...state, fetched: true, user });
    }
  }, []);
  console.log(state.user);
  // const toggleName = (e) => {
  //   setState({... state, first_name: e.target.value});
  // };

  // const togglePhoto = () => {
  //   setPhoto(!editPhoto);
  // };
  // const toggleName = () => {
  //   setPhoto(!editName);
  // };
  // const toggleNickname = () => {
  //   setNickname(!editNickname);
  // };
  // const toggleDate = () => {
  //   setDate(!editDate);
  // };
  // const toggleGenre = () => {
  //   setGenre(!editGenre);
  // };
  // const togglePassword = () => {
  //   setPassword(!editPassword);
  // };
  // const toggleEmail = () => {
  //   setEmail(!editEmail);
  // };
  // const togglePhone = () => {
  //   setPhone(!editPhone);
  // };

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
              {/* 
              <CFormGroup>
                <CLabel htmlFor="nf-last_name">Sobrenome</CLabel>
                <CInput
                  type="text"
                  id="nf-last_name"
                  name="nf-last_name"
                  autoComplete="lastname"
                  value={state.user.last_name}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.last_name = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup> */}

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
                  {/* <option value="m" selected={state.gender.man}>
                    Masculino
                  </option>
                  <option value="w" selected={state.gender.woman}>
                    Feminino
                  </option>
                  <option value="a" selected={state.gender.another}>
                    Outros
                  </option> */}
                </CSelect>
                {/* <CInput
                  type="text"
                  id="nf-genre"
                  name="nf-genre"
                  autoComplete="genre"
                  value={state.user.genre}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.genre = e.target.value;
                    setState({ ...state, user });
                  }}
                /> */}
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
      {/*     
      <CListGroup>
        <CListGroupItem onClick={togglePhoto} href="#" color="secondary">
          Foto:
          <div className="c-avatar">
            <CImg
              style={{ cursor: "pointer" }}
              src="avatars/7.jpg"
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </CListGroupItem>
        <CModal show={editPhoto} onClose={togglePhoto}>
          <CModalHeader closeButton>Alterar foto</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="photo">Foto</CLabel>
              <CInput
                id="photo"
                placeholder="Adicione a URL da foto"
                required
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={togglePhoto}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleName} href="#" color="secondary">
          Nome: Igor Oliveira de Sousa
        </CListGroupItem>
        <CModal show={editName} onClose={toggleName}>
          <CModalHeader closeButton>Alterar nome</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="name">Nome</CLabel>
              <CInput 
                id="name" 
                placeholder="Igor" 
                required 
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="lastname">Sobrenome</CLabel>
              <CInput 
                id="lastname" 
                placeholder="Oliveira de Sousa" 
                required 
                />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={toggleName}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleNickname} href="#" color="secondary">
          Apelido: Igor
        </CListGroupItem>
        <CModal show={editNickname} onClose={toggleNickname}>
          <CModalHeader closeButton>Alterar apelido</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="nickname">Apelido</CLabel>
              <CInput 
                id="nickname" 
                placeholder="Igor" 
                required 
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={toggleNickname}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleDate} href="#" color="secondary">
          Data de nascimento: 24 de novembro de 1997
        </CListGroupItem>
        <CModal show={editDate} onClose={toggleDate}>
          <CModalHeader closeButton>Alterar data de nascimento</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="day">Dia</CLabel>
              <CInput 
                id="day"
                placeholder="24" 
                required 
                />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="month">Mês</CLabel>
              <CInput 
                id="day"
                placeholder="24" 
                required 
                />
              <CDropdown>
                <CDropdownToggle>Novembro</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Janeiro</CDropdownItem>
                  <CDropdownItem>Fevereiro</CDropdownItem>
                  <CDropdownItem>Março</CDropdownItem>
                  <CDropdownItem>Abril</CDropdownItem>
                  <CDropdownItem>Maio</CDropdownItem>
                  <CDropdownItem>Junho</CDropdownItem>
                  <CDropdownItem>Julho</CDropdownItem>
                  <CDropdownItem>Agosto</CDropdownItem>
                  <CDropdownItem>Setembro</CDropdownItem>
                  <CDropdownItem>Outubro</CDropdownItem>
                  <CDropdownItem>Novembro</CDropdownItem>
                  <CDropdownItem>Dezembro</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="year">Ano</CLabel>
              <CInput id="year" placeholder="1997" required />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={toggleDate}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleGenre} href="#" color="secondary">
          Gênero: Masculino
        </CListGroupItem>
        <CModal show={editGenre} onClose={toggleGenre}>
          <CModalHeader closeButton>Alterar Gênero</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="name">Gênero</CLabel>
              <CDropdown>
                <CDropdownToggle>Masculino</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Masculino</CDropdownItem>
                  <CDropdownItem>Feminino</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={toggleGenre}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={togglePassword} href="#" color="secondary">
          Senha: ......
        </CListGroupItem>
        <CModal show={editPassword} onClose={togglePassword}>
          <CModalHeader closeButton>Alterar senha</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="nf-password">Senha</CLabel>
              <CInput
                type="password"
                id="nf-password"
                name="nf-password"
                placeholder="Digite a senha"
                autoComplete="current-password"
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={togglePassword}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>
      </CListGroup>

      <CListGroup> */}
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
                {/*<CInput
                  type="number"
                  id="nf-phone"
                  name="nf-phone"
                  autoComplete="phone"
                  value={state.user.phone}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.phone = e.target.value;
                    setState({ ...state, user });
                  }}
                /> */}
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

      {/* 
        <CListGroupItem onClick={toggleEmail} href="#" color="secondary">
          Email: igor@furg.br
        </CListGroupItem>
        <CModal show={editEmail} onClose={toggleEmail}>
          <CModalHeader closeButton>Alterar email</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Email</CLabel>
              <CInput
                type="email"
                id="nf-email"
                name="nf-email"
                placeholder="igor@furg.br"
                autoComplete="email"
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={toggleEmail}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={togglePhone} href="#" color="secondary">
          Telefone: (53)984366433
        </CListGroupItem>
        <CModal show={editPhone} onClose={togglePhone}>
          <CModalHeader closeButton>Alterar telefone</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="nf-phone">Telefone</CLabel>
              <CInput
                type="phone"
                id="nf-phone"
                name="nf-phone"
                placeholder="(53)984366433"
                autoComplete="phone"
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{" "}
            <CButton color="secondary" onClick={togglePhone}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>
      </CListGroup> */}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
