import React from 'react'
import { AppFooterSpan } from './components/AppFooterSpan';

export default function Pagination({ postsPerPage, totalPosts, paginate }: any) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            {
                pageNumbers.map(number => {
                    return (
                        <AppFooterSpan key={number} onClick={() => paginate(number)}>
                            {number}
                        </AppFooterSpan>
                    )
                })
            }
        </>
    )
}
