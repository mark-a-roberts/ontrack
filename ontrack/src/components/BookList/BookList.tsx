import {Book} from "../../types";
import {Col} from "react-bootstrap";
import {BookItem} from "../BookItem";
import React from "react";

type Props = {
    books: Array<Book>
}

export const BookList: React.FC<Props> = ({books}) => {
    return <>
        {books.map((book: Book, k: number) => (
            <Col key={k} lg={3} sm={6} xs={12}>
                <BookItem key={k} book={book}/>
            </Col>
        )
        )}
    </>
}

