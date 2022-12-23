import axios from "axios";
import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from 'react-bootstrap/FormControl';
import {MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";

export default function TodoList({todos = [], setTodos}) {
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const handleClose = () => {
      setShow(false);
    }

    const handleDelete = (id) => {
      axios.delete(`https://todoapiwithreact.pythonanywhere.com/api/v1/todos/${id}/`)
        .then(() => {
          const newTodos = todos.filter(t => {
            return t.id !== id 
          });
          setTodos(newTodos);
        }).catch(() => {
          alert("Kechirasiz dasturiy nosozlik yuz berdi!")
        })
    } 

    const handleUpdate = async (id, value) => {
      return axios.patch(`https://todoapiwithreact.pythonanywhere.com/api/v1/todos/${id}/`, value)
        .then((res) => {
          const {data} = res;
          const newTodos = todos.map(t => {
            if (t.id === id){
              return data;
            }
            return t;
          })
          setTodos(newTodos)
        }).catch(() => {
          alert("Kechirasiz dasturiy nosozlik yuz berdi!")
        })
    }

    const renderListGroupItem = (t) => {
      return <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center">
          <span style={{
            marginRight: "12px",
            cursor: "pointer"
          }} onClick={() => {
            handleUpdate(t.id, {
              completed: !t.completed
            })
          }}>
            {t.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </span>
          <span>
            {t.name}
          </span>
        </div>
        <div>
          <MdEdit style={{
            cursor: "pointer",
            margin: "12px"
          }} onClick={() => {
            setRecord(t);
            setShow(true)
          }} />
          <MdDelete style={{
            cursor: "pointer"
          }} onClick={() => {
            handleDelete(t.id);
          }}/>
        </div>
      </ListGroup.Item>
    }

  const handleChange = (e) => {
    setRecord({
      ...record,
      name: e.target.value
    })
  }

  const completedTodos = todos.filter(t => t.completed === true);
  const incompletedTodos = todos.filter(t => t.completed === false);

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, {
      name: record.name
    });
    handleClose();
  }

  return <div>
    <div className="mb-2 mt-4">
      Bajarilmagan qaydlar({incompletedTodos.length})
    </div>
    <ListGroup>
      {incompletedTodos.map(renderListGroupItem)}
    </ListGroup>
    <div className="mb-2 mt-4">
      Bajarilgan qaydlar({completedTodos.length})
    </div>
    <ListGroup>
      {completedTodos.map(renderListGroupItem)}
    </ListGroup>
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Tahrrilash</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormControl value={record ? record.name : ""} onChange={handleChange} />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Yopish</Button>
      <Button variant="primary" onClick={handleSaveChanges}>Tahrrilash</Button>
    </Modal.Footer>
  </Modal>
  </div>
}