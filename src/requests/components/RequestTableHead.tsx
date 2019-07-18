import styled from 'styled-components';

export const RequestTableHead = styled.thead`
    position: absolute;
    width: 100%;
    display: inherit;
    background-color: #13927C;
    box-sizing: border-box;
    color: white;
    border: 1px solid #13927C;

    @media (max-width: 768px) {
        display: block;
        position: static;
        border: none;
        margin-bottom: -10px;
    }
`;
