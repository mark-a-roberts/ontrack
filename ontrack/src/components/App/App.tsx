import React, {useState, useEffect} from 'react';
import './App.scss';

import {Book} from "../../types";
import { BookList } from "../BookList";
import {BookListRequest, bookListRequest} from "../../api/bookListRequest";
import {
    Container,
    Row, Col,
    Form, FormControl,
    Navbar, Nav,
    Pagination
} from "react-bootstrap";

const ItemsPerPage = 20;

export function App() {

    const [data, setData] = useState({books: [], count: 0});
    const [filter, setFilter] = useState('');

    const pageCount = (data.count > ItemsPerPage) ? Math.floor(data.count / ItemsPerPage) : 1;
    const pages = new Array(pageCount).map((item, index) => (index + 1));

    const pageSelect = (p: number) => {
        console.log(p)
    }

    const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);
    }

    async function request() {
        let request: BookListRequest = {
            page: 1,
            itemsPerPage: ItemsPerPage,
        };

        if (filter.length) {
            request.filters = [{type: "all", values: [filter]}]
        }

        await bookListRequest(request).then((result) => {
            const newData = {...data};
            newData.books = result.data.books;
            newData.count = result.data.count;
            setData(newData);
        })
    }

    useEffect(() => {
        request();
    }, []);

    useEffect(() => {
        request();
    }, [filter])

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
            <Row>
                <Col>
                    <Pagination>
                        <Pagination.First
                            onClick={() => pageSelect(1)}
                        />
                        <Pagination.Prev/>
                        {pages.map((p, key) => (
                            <Pagination.Item key={key}
                                             onClick={() => pageSelect(p)}>{p}</Pagination.Item>
                        ))}
                        <Pagination.Next/>
                        <Pagination.Last
                            onClick={() => pageSelect(pageCount)}
                        />
                    </Pagination>
                </Col>
            </Row>
            <Row>
                <BookList books={data.books} />
            </Row>
        </Container>
    );
}

