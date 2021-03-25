//REACT
import React, { useState, useEffect, useCallback } from "react";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CCol,
  CFormGroup,
  CLabel,
  CInputCheckbox,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCardFooter
} from "@coreui/react";
//Componets
import CIcon from "@coreui/icons-react";
//Style
//API
import { confirmAlert } from "react-confirm-alert"; // Import
import { alert } from "../../../util/alertApi";
import { API_URL, getPlaylistWithVideoId, addVideoToPlaylist, removeVideoFromPlaylist, createPlaylist} from "../../../util/Api";
//import { isInteger } from "core-js/core/number";


const SavePlaylist = ({ user, video_id, kill}) => {
  console.log(video_id)
  const [state, setState] = useState({
    playlists:[],
  });

  const [nPlaylist, setNPlaylist] = useState({name:"", public_bool: "", closed: true});

  const save = data => {
    console.log(data);
  }

  const playlistsPopup = () => {
    
      if (user.token) {
          confirmAlert({
            title:"Playlists",
            afterClose:kill,
            customUI: ({ onClose}) => {
              var text,
                option = [];
              return (
                <CCard style={{backgroundColor: "lightgrey"}}>
                            <CCardBody>
                <div className="custom-ui">
                  
                  <CFormGroup row>
                    <CCol >
                    <p><strong>Salvar em...</strong></p>
                      
                        {state.playlists.map((playlist,index) => (
                          
                          <CFormGroup key={index} variant="checkbox">
                            <CRow>
                            <CCol sm="10">
                          <input type="checkbox"
                          className="form-check-input"
                          
                          id={playlist.id}
                          checked={playlist.inside}
                          name={index} onChange={e => {playlistClick(e.target.name)}}
                        ></input>
                        <CLabel
                          style={{ color: "black", paddingLeft:"5px"}}
                          htmlFor="radio1"
                          
                        >
                          {playlist.name}
                        
                        </CLabel>
                        </CCol>
                        <CCol sm="1">
                        {playlist.public ?
                          <CIcon name="cil-globe-alt"/>
                          :
                          <CIcon name="cil-lock-locked"/>
                        }
                        </CCol>
                        </CRow>
                        </CFormGroup>
                        ))}
                      
                    </CCol>
                  </CFormGroup>
                  {/* <button class="myBut" onClick={onClose}>
                    Sair
                  </button> */}
                  {/* <button
                    class="myBut"
                    onClick={() => save(option)}
                  >
                    Enviar
                  </button> */}
                </div>
                </CCardBody>
                <CCardFooter style={{backgroundColor: "lightgrey"}}>
                {nPlaylist.closed ?
                        <CButton onClick={() => {setNPlaylist({...nPlaylist, closed:false})}}><CIcon name="cil-plus"/><CLabel style={{color: "black"}} > Nova Playlist</CLabel></CButton>
                      :
                         <CButton onClick={() => {setNPlaylist({...nPlaylist, closed:true})}}>click</CButton>
                          
                      }
                </CCardFooter>
                </CCard>
              );
            },
          });
        
      } 
    
      
  };
  console.log(nPlaylist)
  const playlistClick = async (index) => {
    console.log(index)
    let playlists = JSON.parse(JSON.stringify(state.playlists))
    // for(let i =0; i < playlists.length; i++){
      
    // }
    playlists[index].inside = !playlists[index].inside
    if(playlists[index].inside){
      await addToPlaylist(playlists[index].id)
    }else{
      await removeFromPlaylist(playlists[index].id)
    }
    setState({...state, playlists})
  }

  

  const createPlaylist = async (name, public_bool) => {
    var data = {token:user.token, name, public:public_bool}
    var response = await createPlaylist(data)
    console.log(response)
  }

  const addToPlaylist = async (playlist_id) => {
    var data = {token:user.token, video_id, playlist_id}
    var response = await addVideoToPlaylist(data)
    console.log(response)
  }

  const removeFromPlaylist = async (playlist_id) => {
    var data = {token:user.token, video_id, playlist_id}
    var response = await removeVideoFromPlaylist(data)
    console.log(response)
  }

  const getPlaylists = async () => {
    var data = { token: user.token, video_id:video_id};
    const dt =  await getPlaylistWithVideoId(data)
    console.log(dt)
    var playlists = [];
    for (let i = 0; i < dt[0].length; i++) {
      console.log(i)
      var playlist = {
        id: dt[0][i].id,
        name: dt[0][i].name,
        public: dt[0][i].public,
        inside: (dt[0][i].id in dt[1])
      }
      playlists.push(playlist)
    }
    console.log(playlists);
    setState({...state, playlists})
  }

  useEffect(() => {
    getPlaylists()
    
  }, []);

  useEffect(() => {
    playlistsPopup();
  },[state.playlists, nPlaylist])
  console.log(state)
  return <div />;
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SavePlaylist);
