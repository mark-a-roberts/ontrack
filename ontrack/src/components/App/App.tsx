import React, {useState} from 'react';
import './App.scss';

import {BookPage} from "../BookPage/BookPage";

import {
    Container,
    Form, FormControl,
    Navbar, Nav,
} from "react-bootstrap";

export function App() {

    const [filter, setFilter] = useState('');

    const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);
    }



    return (
        <Container fluid={true}>
            <Navbar bg={"primary"} variant={"dark"} expand="lg">
                <Navbar.Brand href="#home">The Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={changeFilter}/>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <BookPage filter={filter}/>
        </Container>
    );
}

