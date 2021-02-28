import React from 'react';
import { render, screen } from '@testing-library/react';
import { Book } from "../../types";
import { BookList } from "../BookList";

test('renders BookList', () => {
    const book1: Book = {
        book_author: [ "Ian Fleming" ],
        book_publication_country: "England",
        book_publication_year: 1954,
        book_publication_city: "London",
        book_pages: 234,
        book_title: "Live and Let Die",
        id: 12
    }

    const books = [
        book1
    ]

    render(<BookList books={books} />);
    const linkElement = screen.getByText(/London/i);
    expect(linkElement).toBeInTheDocument();
});
