import styled from 'styled-components';

export const AppHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${props => props.theme.colors.dark};
  min-height: 150px;
  padding: 10px;
  color: ${props => props.theme.colors.light};
`;
