import React from "react";
import Card from 'react-bootstrap/Card';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism/';


export default function ApiReviews(){
    return <Card className="mt-5 mb-5">
        <Card.Body>
            <Card.Title style={{textAlign: "center"}}>TodoAPI</Card.Title>
            <Card.Text>
                <span style={{color: "blue", fontWeight: 700}}>TodoAPI:</span>  <span style={{color: "red", fontWeight: 700}}>GET</span> 
                <br />
                Barcha qaydlar
                <SyntaxHighlighter language="python" style={dracula}>
                    {"\"url\": \"https://todoapiwithreact.pythonanywhere.com/api/v1/todos/\""}
                </SyntaxHighlighter>
                <SyntaxHighlighter language="python" style={dracula}>
                    {"[\n\t{\n\t\"id\": 1,\n\t\"name\": \"Learn Django\",\n\t\"completed\": True\n\t}, \n\t...\n]"}
                </SyntaxHighlighter>
                <SyntaxHighlighter language="python" style={dracula}>
                    {"import requests\nresponse = requests.get(\"https://todoapiwithreact.pythonanywhere.com/api/v1/todos/\").json()\nprint(response)"}
                </SyntaxHighlighter>

                <span style={{color: "blue", fontWeight: 700}}>TodoAPI:</span>  <span style={{color: "red", fontWeight: 700}}>POST</span> 
                <br />
                <SyntaxHighlighter language="python" style={dracula}>
                    {"\"url\": \"https://todoapiwithreact.pythonanywhere.com/api/v1/todos/\""}
                </SyntaxHighlighter>
                <SyntaxHighlighter language="python" style={dracula}>
                    {"import requests\nresponse = requests.post(\n\t\turl=\"https://todoapiwithreact.pythonanywhere.com/api/v1/todos/\"\n\t\tdata={\n\t\t\t\"name\": \"<todo_name>\"\n\t\t\t\"completed\": <True_or_False>}).json()\nprint(response)"}
                </SyntaxHighlighter>
            </Card.Text>
        </Card.Body>
    </Card>
}