import React from "react";
import { styled } from "styled-components";

const Footer = () => {
  return (
    <Container>
      <span>Drag and drop to reorder list</span>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  color: var(--Footer-Text);
  font-weight: 700;
  text-align: center;
  margin-top: 30px;
  @media only screen and (max-width: 600px) {
    margin-top: 120px;
  }
`;
