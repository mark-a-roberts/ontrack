import axios from "axios";
import {Book} from ".././types";

const apiURL = "http://nyx.vima.ekt.gr:3000";

export interface BookListFilter {
    type: string;
    values: Array<string>;
}

export interface BookListResponse {
    books: Array<Book>;
    count: number;
}

export interface BookListRequest {
    page?: number;
    itemsPerPage?: number;
    filters?: Array<BookListFilter>
}


export const bookListRequest =  ( data: BookListRequest) => {
    const api = '/api/books';
    return axios.post(
        `${apiURL}${api}`,
        data
    );
}
