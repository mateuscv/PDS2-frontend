//React
import React, { useState, useEffect, Component } from "react";
import { useHistory, useParams } from "react-router-dom";
//CoreUi
import {
  CContainer,
  CCard,
  CRow,
  CCol,
  CForm,
  CSelect,
  CCardBody,
  CCardHeader,
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
//Api
import { checkEmail } from "../../../util/Api";
//Style
import "./emailConfirm.css";

const Confirm = ({ history }) => {
  let id = useParams();

  const handleClick = (route) => {
    history.push("/" + route);
  };

  const sendEmail = () => {};

  const [state, setState] = useState({
    fetched: false,
    error: "",
    message: "",
  });

  useEffect(() => {
    if (!state.fetched) {
      if (!id) {
        history.push("/login");
      } else {
        checkEmail(id)
          .then(function (data) {
            setState({
              ...state,
              fetched: true,
              message: "Email Confirmado com sucesso",
            });
          })
          .catch((err) => {
            setState({
              ...state,
              fetched: true,
              error: "Houve um problema na verificação",
            });
          });
      }
    }
  }, []);

  return (
    <div className="confirm">
      {state.error != "" && (
        <div id="divBut">
          <div>
            <CRow class="msg">
              <CCard className="border-danger">
                <CCard>
                  <CImg
                    style={{ width: "100%" }}
                    className="c-sidebar-brand-full"
                    src="https://cdn.discordapp.com/attachments/300483456440336385/790994079717523472/banner_3.png"
                  />
                </CCard>
                <CCardHeader id="title">
                  <h1>{state.error}.</h1>
                </CCardHeader>
                <CCardBody>
                  <h3 id="align">Tentar novamente</h3>
                  <p id="align">
                    <CButton
                      onClick={() => handleClick("login")}
                      class="myButton"
                    >
                      Reenviar
                    </CButton>
                  </p>
                </CCardBody>
              </CCard>
            </CRow>
          </div>
        </div>
      )}
      {state.message != "" && (
        <div id="divBut">
          <div>
            <CRow class="msg">
              <CCard className="border-success">
                <CCard>
                  <CImg
                    style={{ width: "100%" }}
                    className="c-sidebar-brand-full"
                    src="https://youtube-videos-furg.s3.sa-east-1.amazonaws.com/banner_2.png"
                  />
                </CCard>
                <CCardHeader id="title">
                  <h1>{state.message}.</h1>
                </CCardHeader>
                <CCardBody>
                  <h3 id="align">Verificação finalizada</h3>
                  <div id="align">
                    Obrigado por registra-se no NinTube
                    <div id="align">
                      Click no botão abaixo para se redicionar para aplicação.
                    </div>
                  </div>
                  <p id="align">
                    <CButton
                      onClick={() => handleClick("login")}
                      class="myButton"
                    >
                      Voltar
                    </CButton>
                  </p>
                </CCardBody>
              </CCard>
            </CRow>
          </div>
        </div>
      )}
      {/* <h1>{email.email}</h1> */}
    </div>
  );
};

export default Confirm;
