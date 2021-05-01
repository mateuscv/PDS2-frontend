//REACT
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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
  CCardTitle,
  CWidgetIcon,
  CCardSubtitle,
  CCardText,
  CCardHeader,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
import "../styles/nintube.css";
import "../components/componentStyle.css";
//API
import { SearchAll, Inscribe} from "../../../util/Api";
import { diffDate } from "../../../util/dateDiff";


const ChannelSearch = ({ user, search, channel_id}) => {
  
    const [state, setState] = useState({
    searchText: search,
    channel_id: channel_id,
    videos: [],
  });
  console.log(state.searchText)
  let history = useHistory();
  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };

  const handleKeys = e => {      
    if (e.keyCode === 13) {      
        doSearch();
    }  
  };

  // const searchSimulator = () => {
  //     let data = {
  //       videos: [
  //           {
  //            id: "wadwfagjtfd",
  //            title: "VIDEO 1 VIDEO 1 VIDEO 1 VIDEO 1 VIDEO 1 ",
  //            views: 10,
  //            created_at: "2021-03-23 20:26:13",
  //            description: "TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 ",
  //            thumb: "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  //            },
  //           {
  //           id: "grhftgxgrdzrgd",
  //           title: "VIDEO 2 VIDEO 2 VIDEO 2 VIDEO 2 VIDEO 2 ",
  //           views: 20,
  //           created_at: "2021-03-23 20:26:13",
  //           description: "TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 ",
  //           thumb: "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
  //           },
  //          ]
  //     }

  //   return data
  // }

  const doSearch = () => {
      console.log(state.searchText)
    var data = {
        input: state.searchText,
        channel_id: state.channel_id
    };
    // data = searchSimulator()
    // setState({ ...state, fetched: true, videos:data.videos});
    SearchAll(data).then(function (data) { 
        setState({ ...state, videos:data.videos});
    });
  }

  useEffect(() => {
    doSearch()
  }, []);
  return (
    <div>
        <center>
        <CInputGroup style={{ border: "1px solid red", borderRadius: "5px", width:"50%",}}>
          <CInput placeholder="Pesquisar" onKeyUp={handleKeys} value={state.searchText} onChange={(e)=>{setState({...state, searchText:e.target.value})}}/>
          <CInputGroupAppend>
            <CInputGroupText>
              <CIcon name="cil-magnifying-glass" onClick={doSearch}/>
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
        </center>
        <br/>
      {!state.fetched && (
        <div className="c-app c-default-layout" style={{ height: "100%" }}>
          <div className="div-reload">
            <CIcon className="icone" name="cilReload" size="3xl" />
          </div>
        </div>
      )}
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
                    onClick={() => handleClick("view", item.id)}
                    style={{
                      
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
                        onClick={() => handleClick("view", item.id)}
                      >
                        {item.title.length <= 103 ? item.name: item.title.substring(0, 100) + "..."}
                      </h5>
                      
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {` • ${item.views}  Visualizações • ${diffDate(
                          state.today,
                          item.created_at
                        )}`}
                      </span>{" "}
                    </CCardText>
                    <CCardText
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick("view", item.id)}
                    >
                    <div className="float-left">
                      {item.description.substring(0, 60) + "..."}
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChannelSearch);
