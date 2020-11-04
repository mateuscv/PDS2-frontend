import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdownNotif = () => {
  const itemsCount = 5;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="dark">
          <strong style={{ color: "white" }}>Notificações</strong>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/7.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            {/* <div>
              <small className="text-muted">John Doe</small>
              <small className="text-muted float-right mt-1">Just now</small>
            </div> */}
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important
              message
            </div>
            <div className="small text-muted text-truncate">há 5 dias</div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/6.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            {/* <div>
              <small className="text-muted">Jane Dovve</small>
              <small className="text-muted float-right mt-1">
                5 minutes ago
              </small>
            </div> */}
            <div className="text-truncate font-weight-bold">
              Lorem ipsum dolor sit amet
            </div>
            <div className="small text-muted text-truncate">há 1 semana</div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/5.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-danger"></span>
              </div>
            </div>
            {/* <div>
              <small className="text-muted">Janet Doe</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div> */}
            <div className="text-truncate font-weight-bold">
              Lorem ipsum dolor sit amet
            </div>
            <div className="small text-muted text-truncate">há 3 semana</div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/4.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              {/* <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-right mt-1">4:03 AM</small> */}
            </div>
            <div className="text-truncate font-weight-bold">
              Lorem ipsum dolor sit amet
            </div>
            <div className="small text-muted text-truncate">há 1 mês</div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#" className="text-center border-top">
          <strong>View all messages</strong>
        </CDropdownItem>
      </CDropdownMenu>

      {/* <CDropdownMenu  placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
        <CDropdownItem><CIcon name="cil-user-follow" className="mr-2 text-success" /> New user registered</CDropdownItem>
        <CDropdownItem><CIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User deleted</CDropdownItem>
        <CDropdownItem><CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales report is ready</CDropdownItem>
        <CDropdownItem><CIcon name="cil-basket" className="mr-2 text-primary" /> New client</CDropdownItem>
        <CDropdownItem><CIcon name="cil-speedometer" className="mr-2 text-warning" /> Server overloaded</CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>CPU Usage</b></small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>Memory Usage</b></small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem>
      </CDropdownMenu> */}
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
