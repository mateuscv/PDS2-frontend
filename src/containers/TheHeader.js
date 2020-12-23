//REACT
import React from "react";
//REDUX
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../store/actions";
//CoreUI
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInput,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = ({ token }) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const dark = "dark";

  return (
    <CHeader class={dark + "-mode"} withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        {/* <CIcon name="cib-youtube" /> */}
        {/* <CHeaderNavItem className="px-3"> */}
        <CHeaderNavLink to="/dashboard">Nintube</CHeaderNavLink>
        <CHeaderNavLink to="/login">Login</CHeaderNavLink>
        {/* </CHeaderNavItem> */}
      </CHeaderNav>

      <CHeaderNav style={{ width: "50%" }} className="d-md-down-none mr-auto">
        <CInputGroup style={{ border: "1px solid red", borderRadius: "5px" }}>
          <CInput placeholder="Pesquisar" />
          <CInputGroupAppend>
            <CInputGroupText>
              <CIcon name="cil-magnifying-glass" />
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
      </CHeaderNav>
      {/* {token == undefined && <CButton>Login </CButton>} */}
      {console.log(token)}
      {token != undefined && (
        <CHeaderNav className="px-3">
          <TheHeaderDropdownNotif />
          {/* <TheHeaderDropdownTasks /> */}
          {/* <TheHeaderDropdownMssg /> */}
          <TheHeaderDropdown />
        </CHeaderNav>
      )}
      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div>
      </CSubheader> */}
    </CHeader>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TheHeader);
