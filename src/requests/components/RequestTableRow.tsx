import styled from 'styled-components';

export const RequestTableRow = styled.tr`
    background-color: ${(props: { isOdd: boolean }) => props && props.isOdd ? 'white' : '#F1F1F1'};
`;
