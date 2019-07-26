import styled from 'styled-components';

export const AppHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${props => props.theme.colors.dark};
  height: ${props => props.theme.appHeader.desktopHeight};
  padding: ${props => props.theme.appHeader.padding};
  color: ${props => props.theme.colors.light};
  @media (max-width: 768px) {
    box-sizing: border-box;
    height: auto;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    }
`;
