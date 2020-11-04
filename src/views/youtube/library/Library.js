import React from "react";
import { CButton } from "@coreui/react";
// import { Container } from './styles';

const library = ({ history }) => {
  const handleClick = () => {
    history.push("/playlist");
  };

  return (
    <div>
      <h1>Biblioteca</h1>
      <CButton onClick={() => handleClick()}>Playlist</CButton>
    </div>
  );
};

export default library;
