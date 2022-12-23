import React, {useState, useEffect} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import axios from "axios";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ApiReviews from "./components/ApiReview";


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://todoapiwithreact.pythonanywhere.com/api/v1/todos/")
    .then((res) => {
      setTodos(res.data);
    }).catch(() => {
      alert("Kechirasiz dasturiy nosozlik yuz berdi!")
    })
  }, [])

  return (
    <div>
      <Navbar bg="light" style={{
        marginBottom: "20px"
      }}>
        <Container>
          <Navbar.Brand href="#">
            Qaydlar
          </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
            </Nav>
              <Nav.Link href="https://t.me/pip3_install_ali/" className="d-flex">Ali</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <TodoForm  todos={todos} setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos}/>
        <ApiReviews />
      </Container>
    </div>
  );
}

export default App;
