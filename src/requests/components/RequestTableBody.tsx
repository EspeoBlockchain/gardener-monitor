import styled from 'styled-components';

export const RequestTableBody = styled.tbody`
    position: absolute;
    height: ${props => props.theme.heights.desktop};
    width: 100%;
    display: flex;
    overflow: auto;
    top: 210px;
    flex-direction: column;

@media (max-width: ${props => props.theme.maxWidths.mobile}) {
    display: block;
    position: static;
    height: 100%;
    top: auto;
    }
`;
