//REACT
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  CCardHeader,
  CBreadcrumb,
  CCardBody,
  CBreadcrumbItem,
} from "@coreui/react";
//Componets
//Style
//API
import { alert } from "../../../util/alertApi";
import { getProfile, editProfile, sendEmail } from "../../../util/Api";
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
      verified: "",
    },
    error: "",
    message: "",
  });
  let history = useHistory();
  const handleClick = () => {
    history.push("/edit/profile");
  };

  const verified = () => {
    var data = {
      email: state.user.email,
      token: token,
      cond: 0,
    };
    sendEmail(data).then(function (data) {
      if (data.status === 1) {
        alert("Email Enviado", "Favor Confirme no seu email");
        history.push("/home");
      }
    });
  };

  const profile = (e) => {
    e.preventDefault();
  };

  const solvedData = (data) => {
    var mouths = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    var date = new Date(data.birthdate);
    var birth =
      date.getDate() +
      1 +
      " de " +
      mouths[date.getMonth()] +
      " de " +
      date.getFullYear();
    console.log(birth);
    var gender = "";
    if (data.gender === "m") {
      gender = "Masculino";
    } else if (data.gender === "w") {
      gender = "Feminino";
    } else {
      gender = "Outros";
    }
    data.gender = gender;
    data.birthdate = birth;
    return data;
  };

  useEffect(() => {
    if (!state.fetched) {
      // console.log(token);
      var data = { token: token };
      getProfile(data, token).then(function (data) {
        console.log(data);
        setState({ ...state, user: solvedData(data), fetched: true });
      });
      setState({ ...state, fetched: true });
    }
  }, []);

  return (
    <div>
      <div align="center">
        <h1>Informações pessoais</h1>
        <p style={{ color: "white" }}>
          Informações básicas, como seu nome e foto, usadas nos serviços
        </p>
      </div>
      <div align="center">
        <CRow style={{ width: "75%", color: "white" }}>
          <CCol xs="12">
            <CCard style={{ backgroundColor: "#212121" }}>
              <CCardHeader style={{ backgroundColor: "#212121" }}>
                <h4 style={{ textAlign: "center" }}>Perfil</h4>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "23%",
                      textAlign: "center",
                      verticalAlign: "center",
                    }}
                  >
                    Nome e Foto
                  </div>
                  <div
                    style={{
                      width: "60%",
                      textAlign: "end",
                      verticalAlign: "center",
                    }}
                  >
                    {state.user.username}
                    <img
                      style={{ width: "35px", marginLeft: "7px" }}
                      src="https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png"
                      alt="avatar"
                    ></img>
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      Gênero
                    </div>
                    <div
                      style={{
                        width: "60%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      {state.user.gender}
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      Data de Nascimento
                    </div>
                    <div
                      style={{
                        width: "60%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      {state.user.birthdate}
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      Senha
                    </div>
                    <div
                      style={{
                        width: "60%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      **********
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <h4 style={{ textAlign: "center", width: "100%" }}>
                    Informações de contato
                  </h4>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      E-mail
                    </div>
                    <div
                      style={{
                        width: "60%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      {state.user.email}
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      Telefone
                    </div>
                    <div
                      style={{
                        width: "60%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      {state.user.phone}
                    </div>
                  </div>
                </CBreadcrumb>
                {!state.user.verified && (
                  <CButton
                    style={{ width: "10%" }}
                    color="danger"
                    block
                    onClick={() => verified()}
                  >
                    Verificar Email
                  </CButton>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CButton
          style={{ width: "10%" }}
          color="success"
          block
          onClick={() => handleClick()}
        >
          Editar Perfil
        </CButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
