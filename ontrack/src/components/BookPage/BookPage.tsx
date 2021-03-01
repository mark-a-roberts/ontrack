import {Col, Pagination, Row} from "react-bootstrap";
import {BookList} from "../BookList";
import React, {useEffect, useState} from "react";
import {bookListRequest, BookListRequest} from "../../api/bookListRequest";

type Props = {
    filter: string;
}

const ItemsPerPage = 20;

export const BookPage:React.FC<Props> = ({filter}) => {

    const [data, setData] = useState({books: [], count: 0});

    const [active, setActive] = useState( 1);
    const firstPage = (active > 3) ? (active -2 ) : 1;

    const pageCount = (data.count > ItemsPerPage) ? Math.floor(data.count / ItemsPerPage) : 1;

    const pages = [ ...Array((pageCount > 5) ? 5 : pageCount).fill(0)]
        .map((item, index) => (firstPage+index));

    async function request() {
        let request: BookListRequest = {
            page: active,
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
    }, [filter, active])

    const pageSelect = (p: number) => {
        if (p > 0) {
            setActive(p);
        }
    }

    return <>
        <Row>
            <Col>
                <Pagination>
                    <Pagination.First
                        onClick={() => pageSelect(1)}
                    />
                    <Pagination.Prev
                        onClick={() => pageSelect(active-1)}
                    />
                    {pages.map((p, key) => (
                        <Pagination.Item key={key}
                                         active={p === active}
                                         onClick={() => pageSelect(p)}>{p}</Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => pageSelect(active+1)}
                    />
                    <Pagination.Last
                        onClick={() => pageSelect(pageCount)}
                    />
                </Pagination>
            </Col>
        </Row>
        <Row>
            <BookList books={data.books} />
        </Row>
    </>
}
