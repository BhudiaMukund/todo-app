import React from "react";
import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Todo = ({ item, handleCheck, handleDelete, index, itemType }) => {
  return (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided) => (
        <ListItem
          className={`list-item ${item.id}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <button
            className={!item.complete ? "incomplete" : "complete"}
            onClick={() => handleCheck(item.id)}
          >
            {item.complete && <img src="/images/icon-check.svg" />}
          </button>
          <span className="description">{item && item.description}</span>
          <button className="delete" onClick={() => handleDelete(item.id)}>
            <img src="/images/icon-cross.svg" alt="" />
          </button>
        </ListItem>
      )}
    </Draggable>
  );
};

export default Todo;

const ListItem = styled.li`
  background: var(--Element-Background);
  padding: 18px 15px;
  border-bottom: 1px solid var(--Placeholder);
  display: flex;
  align-items: center;
  button.incomplete {
    position: relative;
    width: 25.5px;
    height: 23px;
    border: 1px solid var(--Placeholder);
    border-radius: 50%;
    background: var(--Element-Background);
    cursor: pointer;
    z-index: 2;
    &::after {
      position: absolute;
      content: "";
      inset: 0;
      z-index: 10;
      background: var(--Element-Background);
      border-radius: 50%;
    }
    &::before {
      position: absolute;
      content: "";
      inset: -2px;
      border-radius: 50%;
      z-index: 1;
      transform: scale(0);
      transform-origin: center;
      transition: 150ms ease;
      background: linear-gradient(
        to bottom right,
        var(--Check-Background-1),
        var(--Check-Background-2)
      );
    }
    &:hover {
      &::before {
        transform: scale(1);
      }
    }
  }

  button.complete {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 25px;
    height: 23px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(
      to bottom right,
      var(--Check-Background-1),
      var(--Check-Background-2)
    );
  }
  .description {
    margin-left: 24px;
    width: 100%;
    color: var(--List-Text);
    font-size: 18px;
  }
  button.delete {
    border: none;
    display: none;
    align-items: center;
    justify-content: center;
    outline: none;
    background: transparent;
    cursor: pointer;
    img {
      width: 20px;
    }
  }
  &:hover {
    button.delete {
      display: flex;
    }
  }
  @media only screen and (max-width: 600px) {
    padding: 15px 12px;
    .description {
      font-size: 15px;
      margin-left: 10px;
    }
    button.delete {
      display: flex;
    }
  }
`;
