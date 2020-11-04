import React from "react";
import { Link } from "react-router-dom";
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

const Register = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs="12" md="5">
            <CCard>
              <CCardBody>
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CFormGroup row>
                    <CCol md="6">
                      <CInput placeholder="Nome" />
                    </CCol>
                    <CCol md="6">
                      <CInput placeholder="Sobrenome" />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CInput placeholder="Seu endereço de Email" />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CInput placeholder="Senha" />
                    </CCol>
                    <CCol md="6">
                      <CInput placeholder="Confirmar" />
                    </CCol>
                  </CFormGroup>
                  <Link to="/login">
                    <p color="primary" className="mt-3" active tabIndex={-1}>
                      Login
                    </p>
                  </Link>
                  <CButton color="success" block>
                    Criar Conta
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          {/* <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CButton color="success" block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol> */}
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
