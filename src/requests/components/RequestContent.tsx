import styled from 'styled-components';

export const RequestContent = styled.div`
    box-sizing: border-box;
    display: block;
    padding: 10px;
    height: 100%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        width: 70%;
    }
`;
