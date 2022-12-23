import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import axios from "axios";


export default function TodoForm({ todos, setTodos }) {
    const [name, setName] = useState("");
    const handleChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(name)
        if (!name) {
            alert("Iltimos maydonni to'ldiring!");
            return;
        }

        axios.post("https://todoapiwithreact.pythonanywhere.com/api/v1/todos/", {
            name: name
        }).then((res) => {
            setName("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ]).catch(() => {
                alert("Kechirasiz dasturiy nosozlik yuz berdi!");
            })
        })
    }

    return <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-5">
            <FormControl placeholder="Yangi qayd" onChange={handleChange} value={name} />
            <Button type="submit" >Yaratish</Button>
        </InputGroup>
    </Form>
}