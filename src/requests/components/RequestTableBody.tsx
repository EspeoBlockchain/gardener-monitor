import styled from 'styled-components';

export const RequestTableBody = styled.tbody`
    position: absolute;
    height: 500px;
    width: 100%;
    display: flex;
    overflow: auto;
    top: 210px;
    flex-direction: column;

@media (max-width: 768px) {
    display: block;
    position: static;
    height: 100%;
    top: auto;
    }
`;
