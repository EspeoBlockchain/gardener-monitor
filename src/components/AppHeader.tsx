import styled from 'styled-components';

export const AppHeader = styled.header`
  displey: flex;
  flex-direction: row;
  align-items: space-between;
  background-color: ${props => props.theme.colors.dark};
  height: 150px;
  padding: 20px;
  color: ${props => props.theme.colors.light};
`;
