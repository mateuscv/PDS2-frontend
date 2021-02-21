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
import { alert } from "../../../util/alertApi";
import { sendEmail, API_URL } from "../../../util/Api";
//Style
import "./emailConfirm.css";

const Email = ({ history }) => {
  const send = () => {
    var data = {
      email: state.data.email,
      token: "",
      cond: 1,
    };
    sendEmail(data).then(function (data) {
      if (data.status === 1) {
        alert("Email Enviado", "Favor Confirme no seu email");
        history.push("/home");
      }
    });
  };

  const [state, setState] = useState({
    fetched: false,
    error: "",
    message: "",
    data: { email: "" },
  });

  return (
    <div className="confirm">
      <div id="divBut">
        <div>
          <CRow class="msg">
            <CCard className="border-success">
              <CCard>
                <CImg
                  style={{ width: "100%" }}
                  className="c-sidebar-brand-full"
                  src={API_URL + "media/nintube/banner_2.png"}
                />
              </CCard>
              <CCardBody>
                <h3 id="align">Favor colocar email cadastrado:</h3>
                <p>
                  <CCol>
                    <CForm>
                      <CFormGroup>
                        <CLabel
                          id="lb"
                          htmlFor="nf-password"
                          style={{ color: "black" }}
                        >
                          Email:
                        </CLabel>
                        <CInput
                          type="email"
                          id="nf-email"
                          name="nf-email"
                          autoComplete="email"
                          onChange={(e) => {
                            let data = { ...state.data };
                            data.email = e.target.value;
                            setState({ ...state, data });
                          }}
                        />
                      </CFormGroup>
                    </CForm>
                  </CCol>
                  <div align="center">
                    <CButton onClick={() => send()} class="myButton">
                      Enviar
                    </CButton>
                  </div>
                </p>
              </CCardBody>
            </CCard>
          </CRow>
        </div>
      </div>
      {/* <h1>{email.email}</h1> */}
    </div>
  );
};

export default Email;
