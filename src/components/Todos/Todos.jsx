import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Todo from "../Todo/Todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Todos = ({
  list,
  activeList,
  completeList,
  setList,
  setActiveList,
  setCompleteList,
}) => {
  const [currentDisplay, setCurrentDisplay] = useState("all");
  const handleCheck = (filterItemId) => {
    const filteredList = list.map((item) => {
      if (item.id === filterItemId) {
        // Update the 'complete' property
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setList(filteredList);
  };

  useEffect(() => {
    // Change display if empty
    if (currentDisplay === "active" && activeList.length === 0) {
      setCurrentDisplay("all");
    }
    if (currentDisplay === "completed" && completeList.length === 0) {
      setCurrentDisplay("all");
    }
  }, [activeList, completeList]);

  const handleDelete = (itemId) => {
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
  };

  const clearComplete = () => {
    const newList = list.filter((item) => !item.complete);
    setList(newList);
  };

  useEffect(() => {
    const menuControls = document.querySelectorAll(".menu-btn");

    const changeStyles = () => {
      menuControls.forEach((btn) => {
        if (btn.classList.contains("active")) {
          btn.classList.remove("active");
        }
      });
      document.getElementById(currentDisplay).classList.add("active");
    };

    if (currentDisplay === "all") {
      document.querySelector(".list-container").style.transform =
        "translateX(0)";
      changeStyles();
    } else if (currentDisplay === "active") {
      if (activeList.length > 0) {
        document.querySelector(
          ".list-container"
        ).style.transform = `translateX(-33.3333333%)`;
        changeStyles();
      }
    } else {
      if (completeList.length > 0) {
        document.querySelector(".list-container").style.transform =
          "translateX(-66.6666666%)";
        changeStyles();
      }
    }
  }, [currentDisplay]);

  useEffect(() => {
    list.forEach((item) => {
      const element = document.querySelector(`.${item.id}>span.description`);
      if (item.complete) {
        element.style.textDecoration = "line-through";
        element.style.color = "var(--Placeholder)";
      } else {
        element.style.textDecoration = "none";
        element.style.color = "var(--List-Text)";
      }
    });
  }, [list]);

  const handleMixedListDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  };
  const handleActiveListDragEnd = (result) => {
    const items = Array.from(activeList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setActiveList(items);
  };
  const handleCompleteListDragEnd = (result) => {
    const items = Array.from(completeList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCompleteList(items);
  };
  return (
    <Container activeList={activeList} completeList={completeList}>
      <div className="wrapper">
        <div className="list-container">
          <DragDropContext onDragEnd={handleMixedListDragEnd}>
            <Droppable droppableId="all">
              {(provided) => (
                <ul
                  className="mixed-list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.map((item, index) => {
                    return (
                      <Todo
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                        item={item}
                        index={index}
                        itemType="all"
                        key={`all-item-${item.id}`}
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={handleActiveListDragEnd}>
            <Droppable droppableId="active">
              {(provided) => (
                <ul
                  className="active-list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {activeList.map((item, index) => {
                    return (
                      <Todo
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                        item={item}
                        index={index}
                        itemType="active"
                        key={`active-item-${item.id}`}
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={handleCompleteListDragEnd}>
            <Droppable droppableId="complete">
              {(provided) => (
                <ul
                  className="complete-list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {completeList.map((item, index) => {
                    return (
                      <Todo
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                        item={item}
                        index={index}
                        itemType="complete"
                        key={`complete-item-${item.id}`}
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <nav>
        <div>
          <span>{activeList.length} items left</span>
        </div>
        <div className="controls">
          <button
            id="all"
            className="menu-btn active"
            onClick={(e) => setCurrentDisplay(e.target.id)}
          >
            All
          </button>
          <button
            id="active"
            className="menu-btn"
            onClick={(e) => setCurrentDisplay(e.target.id)}
          >
            Active
          </button>
          <button
            id="completed"
            className="menu-btn"
            onClick={(e) => setCurrentDisplay(e.target.id)}
          >
            Complete
          </button>
        </div>
        <div>
          <button onClick={() => clearComplete()}>Clear complete</button>
        </div>
      </nav>
    </Container>
  );
};

export default Todos;

const Container = styled.main`
  max-width: 640px;

  margin-top: 25px;
  background: var(--Element-Background);
  border-radius: 5px;
  overflow-x: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  .wrapper {
    width: 640px;
    .list-container {
      display: flex;
      flex-direction: row;
      height: max-content;
      max-height: 360px;
      width: max-content;
      overflow-x: hidden;
      border-radius: 5px;
      transition: transform 500ms ease;

      ul {
        overflow-y: auto;
        list-style-type: none;
        min-width: 640px;
        display: flex;
        flex-direction: column;
      }
    }
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    color: var(--Footer-Text);
    font-weight: 700;
    font-size: 17px;

    .controls {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;

      #completed {
        &:hover {
          cursor: ${(props) =>
            props.completeList.length === 0 ? "not-allowed" : "pointer"};
        }
      }
      #active {
        &:hover {
          cursor: ${(props) =>
            props.activeList.length === 0 ? "not-allowed" : "pointer"};
        }
      }
      button {
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        font-weight: 700;
        &:hover {
          color: var(--List-Text);
          cursor: pointer;
        }
      }
      button.active {
        color: var(--Bright-Blue);
      }
    }
    button {
      color: inherit;
      background: transparent;
      outline: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      font-weight: 700;
      &:hover {
        cursor: pointer;
        color: var(--List-Text);
      }
    }
  }
  @media only screen and (max-width: 600px) {
    max-width: 90vw;
    .wrapper {
      width: 90vw;
      .list-container {
        ul {
          width: 90vw;
        }
      }
    }
    nav {
      font-size: 15px;

      .controls {
        position: absolute;
        top: 625px;
        background: var(--Element-Background);
        padding: 15px;
        left: 50%;
        width: 90vw;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        border-radius: 5px;
      }
    }
  }
`;
