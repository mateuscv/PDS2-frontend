import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CToggler,
  CHeaderNavLink,
  CHeaderNav,
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  // const toggleSidebar = () => {
  //   const val = [true, "responsive"].includes(show) ? false : "responsive";
  //   dispatch({ type: "set", sidebarShow: val });
  // };

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CImg
          style={{ width: "100%" }}
          className="c-sidebar-brand-full"
          src="https://cdn.discordapp.com/attachments/300483456440336385/790994274631155733/banner_4.png"
        />
        <CImg
          style={{ width: "100%" }}
          className="c-sidebar-brand-minimized"
          src="https://cdn.discordapp.com/attachments/300483456440336385/790994285977534514/nintube_banner_icon_dark.png"
        />
        {/* <CImg
          style={{ width: "100%" }}
          className="c-sidebar-brand-full"
          src="https://youtube-videos-furg.s3.sa-east-1.amazonaws.com/banner_2.png"
        />
        <CImg
          style={{ width: "100%" }}
          className="c-sidebar-brand-minimized"
          src="https://youtube-videos-furg.s3.sa-east-1.amazonaws.com/nintube_icon1.png"
        /> */}
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
        {/* <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        /> */}
        {/* <CHeaderNav className="d-md-down-none mr-auto"> */}
        {/* <CIcon name="cib-youtube" /> */}
        {/* <CHeaderNavLink to="/">Youtube</CHeaderNavLink> */}
        {/* </CHeaderNav> */}
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
