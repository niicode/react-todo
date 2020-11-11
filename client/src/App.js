import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import Form from "./components/form";
import TodoList from "./components/TodoList";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { light, dark } from "./components/theme";
import Context from "./components/Register_login/context";
import reducer from "./components/Register_login/reducer";
import Switch from "./components/Switch";

export const GlobalStyles = createGlobalStyle`
body, #root {
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
`;

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //reducer
  const [state, dispatch] = useReducer(reducer, {
    isDark: false,
  });

  useEffect(() => {
    getLocalTodos();
  });

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //function
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };
  return (
    <Context.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.isDark ? dark : light}>
        <div className="App">
          <GlobalStyles />
          <Switch />
          <header>
            <h1>Nii's Todo List</h1>
          </header>
          <Form
            todos={todos}
            inputText={inputText}
            setTodos={setTodos}
            setInputText={setInputText}
            setStatus={setStatus}
          />
          <TodoList
            filteredTodos={filteredTodos}
            setTodos={setTodos}
            todos={todos}
          />
        </div>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
