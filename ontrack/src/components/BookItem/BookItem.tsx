import React from "react";
import {Book} from "../../types";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

export const BookItem: React.FC<{book: Book}> = ({book}) => (
    <Card>
        <Card.Body>
            <Card.Title>{book.book_title}</Card.Title>
            <ListGroup>
                <ListGroupItem>
                    <b>Author(s):</b>
                    {book.book_author.join(",")}
                </ListGroupItem>
                <ListGroupItem>
                    <b>Published:</b>
                    {book.book_publication_year} -
                    {book.book_publication_city},
                    {book.book_publication_country}
                </ListGroupItem>
                <ListGroupItem>
                    <b>Pages:</b>
                    {book.book_pages}
                </ListGroupItem>
            </ListGroup>
        </Card.Body>
    </Card>
)
