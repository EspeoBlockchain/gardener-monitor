import styled from 'styled-components';

export const AppHeader = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${props => props.theme.colors.dark};
  height: ${props => props.theme.appHeader.desktopHeight}px;
  padding: ${props => props.theme.appHeader.padding}px;
  color: ${props => props.theme.colors.light};
`;
