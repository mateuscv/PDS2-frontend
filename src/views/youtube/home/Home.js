import React from "react";
import { CButton } from "@coreui/react";
// import { Container } from './styles';

const youtube = ({ history }) => {
  const handleClick = () => {
    history.push("/view");
  };

  return (
    <div>
      <h1>Home</h1>
      <CButton onClick={() => handleClick()}>View</CButton>
    </div>
  );
};

export default youtube;
