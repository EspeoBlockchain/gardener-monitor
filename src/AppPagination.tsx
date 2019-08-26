import React from 'react'
import { AppFooterSpan } from './components/AppFooterSpan';

interface Pagination {
    postsPerPage: number;
    totalPosts: number;
    paginate: (arg1: number) => void;
    currentPage: number;
}

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }: Pagination) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            {
                pageNumbers.map(number => {
                    return (
                        <AppFooterSpan key={number} active={currentPage === number ? true : false} onClick={() => paginate(number)}>
                            {number}
                        </AppFooterSpan>
                    )
                })
            }
        </>
    )
}
