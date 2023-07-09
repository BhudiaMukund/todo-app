import React from "react";
import { styled } from "styled-components";

const Header = ({ theme, setTheme }) => {
  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const themeChangeIcon = () => {
    if (theme === "dark") {
      return "./images/icon-sun.svg";
    } else {
      return "./images/icon-moon.svg";
    }
  };

  return (
    <Container>
      <h1>TODO</h1>
      <button onClick={() => handleThemeChange()}>
        <img
          src={themeChangeIcon()}
          alt={`Set theme to ${theme === "dark" ? "light" : "dark"}`}
        />
      </button>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 640px;

  h1 {
    color: #fff;
    font-size: 45px;
    letter-spacing: 24px;
  }
  button {
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    width: 88vw;
    margin-top: 60px;
    h1 {
      font-size: 30px;
      letter-spacing: 16px;
    }
  }
`;
