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
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
import "../styles/nintube.css";
import "./componentStyle.css";
//API
import { SearchAll, Inscribe } from "../../../util/Api";
import { diffDate } from "../../../util/dateDiff";

const Search = ({ user }) => {
  const [state, setState] = useState({
    searchText: useParams().search,
    videos: [],
    channels: [],
  });

  let history = useHistory();
  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };

  const handleKeys = (e) => {
    if (e.keyCode === 13) {
      doSearch();
    }
  };

  const searchSimulator = () => {
    let data = {
      videos: [
        {
          id: "wadwfagjtfd",
          title: "VIDEO 1 VIDEO 1 VIDEO 1 VIDEO 1 VIDEO 1 ",
          views: 10,
          created_at: "2021-03-23 20:26:13",
          channel_name: "Testando 1",
          channel_id: "541fas165awf651waf",
          description:
            "TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 TESTE 1 ",
          thumb:
            "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
          avatar:
            "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
        },
        {
          id: "grhftgxgrdzrgd",
          title: "VIDEO 2 VIDEO 2 VIDEO 2 VIDEO 2 VIDEO 2 ",
          views: 20,
          created_at: "2021-03-23 20:26:13",
          channel_name: "Testando 2",
          channel_id: "541fas165awf651waf",
          description:
            "TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 TESTE 2 ",
          thumb:
            "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
          avatar:
            "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
        },
      ],
      channels: [
        {
          id: "adwawd65156",
          avatar:
            "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
          name: "CHANNEL 1",
          subscribers: 10000000,
          video_count: 20,
          description: "bjhadwjhdawbh",
          is_subscribed: true,
        },
        {
          id: "hhdrhdr",
          avatar:
            "https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg",
          name: "CHANNEL 2",
          subscribers: 684500000,
          video_count: 50,
          description: "52325fw",
          is_subscribed: true,
        },
      ],
    };

    return data;
  };

  const doSearch = () => {
    console.log(state.searchText);
    var data = {
      input: state.searchText,
    };
    data = searchSimulator();
    setState({
      ...state,
      fetched: true,
      videos: data.videos,
      channels: data.channels,
    });
    // SearchAll(data).then(function (data) {
    //     setState({ ...state, fetched: true, videos:data.videos, channels: data.channels});
    // });
  };

  const Change = (index) => {
    if (user) {
      var data = {
        token: user.token,
        target_id: state.channels[index].id,
      };

      let channels = state.channels;
      channels[index].is_subscribed = !channels[index].is_subscribed;
      if (channels[index].is_subscribed) {
        channels[index].subscribers += 1;
      } else {
        channels[index].subscribers -= 1;
      }
      setState({ ...state, channels });

      //   Inscribe(data)
      //     .then(function (data) {
      //       let channels = state.channels;
      //       channels[index].is_subscribed = ! channels[index].is_subscribed;
      //       if (channels[index].is_subscribed) {
      //         channels[index].subscribers += 1;
      //       } else {
      //         channels[index].subscribers -= 1;
      //       }
      //       setState({ ...state, channels });
      //     })
      //     .catch((err) => {
      //       setState({
      //         ...state,
      //         error: "Algum problema aconteceu, tente novamente mais tarde!",
      //         message: "",
      //       });
      //     });
    } else {
      alert("Login", "Você não está logado!");
    }
  };

  useEffect(() => {
    doSearch();
  }, []);
  return (
    <div>
      <center>
        <CInputGroup
          style={{ border: "1px solid red", borderRadius: "5px", width: "50%" }}
        >
          <CInput
            placeholder="Pesquisar"
            onKeyUp={handleKeys}
            value={state.searchText}
            onChange={(e) => {
              setState({ ...state, searchText: e.target.value });
            }}
          />
          <CInputGroupAppend>
            <CInputGroupText>
              <CIcon name="cil-magnifying-glass" onClick={doSearch} />
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
      </center>
      <br />
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
            {state.channels.map((item, index) => (
              <CCard
                style={{
                  marginBottom: "1%",
                  border: "2px solid #B3272C",
                  borderRadius: "30px",
                }}
              >
                <CCardBody style={{ margin: "0" }}>
                  <CCardBody
                    className=" float-left"
                    style={{ height: "100px" }}
                  >
                    <div className="c-avatar">
                      <CImg
                        style={{
                          cursor: "pointer",
                          height: "75px",
                          width: "75px",
                        }}
                        onClick={() => handleClick("channel", item.id)}
                        src={item.avatar}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                      />
                    </div>
                  </CCardBody>

                  <CCardText>
                    <CCardText>
                      <h5
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {item.name.length <= 103
                          ? item.name
                          : item.name.substring(0, 100) + "..."}
                      </h5>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {` ${item.subscribers} • ${item.video_count}  Vídeos • `}
                      </span>{" "}
                      <br />
                      {item.is_subscribed === false && (
                        <CButton
                          id="inscribe-search"
                          name={"inscribe-" + index}
                          class="inscribe"
                          onClick={(e) => Change(e.target.name.split("-")[1])}
                        >
                          Inscrever-se
                        </CButton>
                      )}{" "}
                      {item.is_subscribed === true && (
                        <CButton
                          id="inscribe-search"
                          name={"inscribe-" + index}
                          class="registered"
                          onClick={(e) => Change(e.target.name.split("-")[1])}
                        >
                          Inscrito
                        </CButton>
                      )}
                    </CCardText>
                  </CCardText>
                </CCardBody>
              </CCard>
            ))}
          </CCol>
        </CRow>
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
                        {item.title.length <= 103
                          ? item.name
                          : item.title.substring(0, 100) + "..."}
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
                      <CCardBody
                        className=" float-left"
                        style={{ height: "50px" }}
                      >
                        <div className="c-avatar">
                          <CImg
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick("channel", item.id)}
                            src={item.avatar}
                            className="c-avatar-img"
                            alt="admin@bootstrapmaster.com"
                          />
                        </div>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleClick("channel", item.channel_id)
                          }
                        >
                          {item.channel_name}
                        </span>
                      </CCardBody>
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);
