import React, { useState } from "react";
import { styled } from "styled-components";

const NewTodo = ({ list, setList }) => {
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const generateRandomId = () => {
      const timestamp = Date.now().toString(36); // Convert current time to base-36 string
      const randomChars = Math.random().toString(36).substring(2, 5); // Get a random string from Math.random()
      return timestamp + randomChars;
    };

    // Add New todo to list
    setList((list) => [
      { id: generateRandomId(), description: description, complete: false },
      ...list,
    ]);
    setDescription("");
  };
  return (
    <Container onSubmit={(e) => handleSubmit(e)}>
      <span className="listStyle"></span>
      <input
        type="text"
        placeholder="Create a new todo..."
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Container>
  );
};

export default NewTodo;

const Container = styled.form`
  background: var(--Element-Background);
  padding: 18px 15px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  margin-top: 38px;
  width: 640px;
  span {
    padding: 9px;
    border-radius: 50%;
    border: 1px solid var(--Placeholder);
  }

  input {
    background: transparent;
    width: 100%;
    font-size: 18px;
    border: none;
    outline: none;
    color: var(--List-Text);
    font-family: inherit;
  }
  input::placeholder {
    color: var(--Placeholder);
    padding: 0;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 16px 12px;
    input {
      font-size: 15px;
    }
  }
`;
