import styled from 'styled-components';

export const RequestLabel = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30%;
        background-color: #13927C;
        box-sizing: border-box;
        color: white;
        padding: 10px;
    }
`;
