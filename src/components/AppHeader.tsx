import styled from 'styled-components';

export const AppHeader = styled.header`
  background-color: ${props => props.theme.colors.dark};
  height: 150px;
  padding: 20px;
  color: ${props => props.theme.colors.light};
`;
