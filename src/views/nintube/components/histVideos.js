//REACT
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CLink,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CIcon,
  CCardTitle,
  CWidgetIcon,
  CCardSubtitle,
  CCardText,
  CCardHeader,
  CImg,
} from "@coreui/react";
//Componets
//Style
//API
import { historic } from "../../../util/Api";
import { diffDate } from "../../../util/dateDiff";

const HistVideo = ({ user }) => {
  const [state, setState] = useState({
    fetched: false,
    videos: [],
  });
  let history = useHistory();
  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };
  useEffect(() => {
    if (!state.fetched) {
      var data = {
        numberSkip: 0,
        token: user.token,
      };
      console.log(data);
      historic(data).then(function (data) {
        // var array = new Array;
        // for (let i = 0; i < aray.length; i++) {
        //   const element = array[i];

        // }
        console.log(data);
        setState({ ...state, fetched: true, videos: data });
      });
    }
  }, []);
  return (
    <div>
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            {state.videos.map((item, index) => (
              <CCard
                style={{
                  marginBottom: "1%",
                  border: "2px solid #B3272C",
                }}
              >
                <CCardBody style={{ margin: "0" }}>
                  <CImg
                    onClick={() => handleClick("view", item.v_id)}
                    style={{
                      width: "15%",
                      height: "150px",
                      cursor: "pointer",
                      float: "left",
                      marginRight: "1%",
                      borderBottom: "1px solid black",
                      borderRadius: "10px",
                    }}
                    src={item.thumb}
                  />
                  <CCardText>
                    <CCardText>
                      <h5
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.v_id)}
                      >
                        {item.title}
                        {/* {item.title.substring(0, 100) + "..."} */}
                      </h5>
                      <span onClick={() => handleClick("channel", item.v_id)}>
                        {item.channel}
                      </span>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.v_id)}
                      >
                        {` • ${item.views}  Visualizações • ${diffDate(
                          state.today,
                          item.date
                        )}`}
                      </span>{" "}
                    </CCardText>
                    <CCardText
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick("view", item.v_id)}
                    >
                      {item.description}
                    </CCardText>{" "}
                  </CCardText>
                </CCardBody>
              </CCard>
            ))}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HistVideo);
