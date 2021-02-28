import React from 'react';
import { render, screen } from '@testing-library/react';
import { Book } from "../../types";
import { BookItem } from "./BookItem";

test('renders BookView', () => {
    const book: Book = {
        book_author: [ "Ian Flaming" ],
        book_publication_country: "England",
        book_publication_year: 1954,
        book_publication_city: "London",
        book_pages: 234,
        book_title: "Live and Let Die",
        id: 12
    }
    render(<BookItem book={book} />);
    const linkElement = screen.getByText(/London/i);
    expect(linkElement).toBeInTheDocument();
});
