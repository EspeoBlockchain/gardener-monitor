import styled from 'styled-components';

export const AppHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${props => props.theme.colors.dark};
  min-height: ${props => props.theme.appHeader.height};
  height: 100%;
  padding: ${props => props.theme.appHeader.padding};
  color: ${props => props.theme.colors.light};
`;
