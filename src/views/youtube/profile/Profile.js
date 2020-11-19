import React, { useEffect, useState } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
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

const Profile = () => {
  const [state, setState] = useState({
    fetched: false,
  });
  useEffect(() => {
    if (!state.fetched) {
      setState({ ...state, fetched: true });
      console.log("oi");
    }
  }, []);

  const [editPhoto, setPhoto] = useState(false);
  const togglePhoto = () => {
    setPhoto(!editPhoto);
  }
  const [editName, setName] = useState(false);
  const toggleName = () => {
    setName(!editName);
  }

  const [editNickname, setNickname] = useState(false);
  const toggleNickname = () => {
    setNickname(!editNickname);
  }

  const [editDate, setDate] = useState(false);
  const toggleDate = () => {
    setDate(!editDate);
  }

  const [editGenre, setGenre] = useState(false);
  const toggleGenre = () => {
    setGenre(!editGenre);
  }

  const [editPassword, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(!editPassword);
  }

  const [editEmail, setEmail] = useState(false);
  const toggleEmail = () => {
    setEmail(!editEmail);
  }

  const [editPhone, setPhone] = useState(false);
  const togglePhone = () => {
    setPhone(!editPhone);
  }

  return (
    <div>
      <div align="center">
        <h1>Informações pessoais</h1>
      Informações básicas, como seu nome e foto, usadas nos serviços</div>

      <h4>Perfil</h4>
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
        <CModal
          show={editPhoto}
          onClose={togglePhoto}
        >
          <CModalHeader closeButton>Alterar foto</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="photo">Foto</CLabel>
              <CInput id="photo" placeholder="Adicione a URL da foto" required />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={togglePhoto}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleName} href="#" color="secondary">
          Nome: Igor Oliveira de Sousa
      </CListGroupItem>
        <CModal
          show={editName}
          onClose={toggleName}
        >
          <CModalHeader closeButton>Alterar nome</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="name">Nome</CLabel>
              <CInput id="name" placeholder="Igor" required />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="lastname">Sobrenome</CLabel>
              <CInput id="lastname" placeholder="Oliveira de Sousa" required />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={toggleName}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleNickname} href="#" color="secondary">
          Apelido: Igor
      </CListGroupItem>
        <CModal
          show={editNickname}
          onClose={toggleNickname}
        >
          <CModalHeader closeButton>Alterar apelido</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="nickname">Apelido</CLabel>
              <CInput id="nickname" placeholder="Igor" required />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={toggleNickname}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleDate} href="#" color="secondary">
          Data de nascimento: 24 de novembro de 1997
      </CListGroupItem>
        <CModal
          show={editDate}
          onClose={toggleDate}
        >
          <CModalHeader closeButton>Alterar data de nascimento</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="day">Dia</CLabel>
              <CInput id="day" placeholder="24" required />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="month">Mês</CLabel>
              <CDropdown>
                <CDropdownToggle>
                  Novembro
                </CDropdownToggle>
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
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={toggleDate}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={toggleGenre} href="#" color="secondary">
          Gênero: Masculino
      </CListGroupItem>
        <CModal
          show={editGenre}
          onClose={toggleGenre}
        >
          <CModalHeader closeButton>Alterar Gênero</CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="name">Gênero</CLabel>
              <CDropdown>
                <CDropdownToggle>
                  Masculino
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Masculino</CDropdownItem>
                  <CDropdownItem>Feminino</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={toggleGenre}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={togglePassword} href="#" color="secondary">
          Senha: ......
      </CListGroupItem>
        <CModal
          show={editPassword}
          onClose={togglePassword}
        >
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
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={togglePassword}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

      </CListGroup>

      <CListGroup>
        <h4>Informações de contato</h4>

        <CListGroupItem onClick={toggleEmail} href="#" color="secondary">
          Email: igor@furg.br
      </CListGroupItem>
        <CModal
          show={editEmail}
          onClose={toggleEmail}
        >
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
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={toggleEmail}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

        <CListGroupItem onClick={togglePhone} href="#" color="secondary">
          Telefone: (53)984366433
      </CListGroupItem>
        <CModal
          show={editPhone}
          onClose={togglePhone}
        >
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
            <CButton color="primary">Salvar</CButton>{' '}
            <CButton color="secondary" onClick={togglePhone}>Cancelar</CButton>
          </CModalFooter>
        </CModal>

      </CListGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
