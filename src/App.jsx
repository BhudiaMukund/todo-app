import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "./components/Header/Header";
import NewTodo from "./components/NewTodo/NewTodo";
import Todos from "./components/Todos/Todos";
import Footer from "./components/Footer/Footer";

function App() {
  // Configure theme
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "dark";
  });

  // Example ToDo List
  const exampleList = [
    {
      id: "example1",
      description: "Complete online JavaScript course",
      complete: true,
    },
    {
      id: "example2",
      description: "Jog around the park 3x",
      complete: false,
    },
    {
      id: "example3",
      description: "10 minutes meditation",
      complete: false,
    },
    {
      id: "example4",
      description: "Read for 1 hour",
      complete: false,
    },
    {
      id: "example5",
      description: "Pick up groceries",
      complete: false,
    },
    {
      id: "example6",
      description: "Complete Todo App on Frontend Mentor",
      complete: false,
    },
  ];

  // Configure ToDo list
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : exampleList;
  });

  const [activeList, setActiveList] = useState([]);
  const [completeList, setCompleteList] = useState([]);

  // Set theme for app
  useEffect(() => {
    // set theme
    const body = document.body;
    if (theme === "dark") {
      if (body.classList.contains("light")) {
        body.classList.remove("light");
      }
    } else {
      body.classList.add("light");
    }

    // Store the theme being used in LocalStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const filteredCompleteList = list.filter((item) => item.complete);
    setCompleteList(filteredCompleteList);

    const filteredActiveList = list.filter((item) => !item.complete);
    setActiveList(filteredActiveList);

    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <Background theme={theme} />
      <Header theme={theme} setTheme={setTheme} />
      <NewTodo list={list} setList={setList} />
      {list.length > 0 && (
        <>
          <Todos
            list={list}
            activeList={activeList}
            completeList={completeList}
            setList={setList}
            setActiveList={setActiveList}
            setCompleteList={setCompleteList}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 40vh;
  z-index: -1;
  background: ${(props) =>
    props.theme === "dark"
      ? `url("../images/bg-desktop-dark.jpg")`
      : `url("../images/bg-desktop-light.jpg")`};

  background-size: cover;
  background-repeat: no-repeat;
  @media only screen and (max-width: 600px) {
    background: ${(props) =>
      props.theme === "dark"
        ? `url("../images/bg-mobile-dark.jpg")`
        : `url("../images/bg-mobile-light.jpg")`};
    background-size: cover;
    background-repeat: no-repeat;
    height: 30vh;
  }
`;
