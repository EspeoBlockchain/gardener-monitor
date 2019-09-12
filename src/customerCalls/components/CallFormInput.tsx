import styled from 'styled-components';

export const CallFormInput = styled.input`
    width: 100%;
    height: 25px;
    outline: none;
    font-size: ${props => props.theme.fontSizes.medium};
    text-align: center;
    ::-webkit-calendar-picker-indicator {
              opacity: 100;
        }
`;
