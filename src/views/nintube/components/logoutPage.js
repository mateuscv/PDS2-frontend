//REACT
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CCard,
  CCardBody,
  CButton,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
//Componets
//Style
//API

function LogouPage() {
  let history = useHistory();
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs="12" md="5">
            <CCard>
              <CCardBody>
                <h1>So é possivel visualizar está aba quando estiver logado</h1>
                <div align="center">
                  <CButton
                    style={{ border: "1px solid red" }}
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LogouPage);
