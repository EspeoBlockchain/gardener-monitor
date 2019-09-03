import styled from 'styled-components';

export const AppFooterSpan = styled.span<{ active: boolean }>`
        cursor: pointer;
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color .3s;
        border: 1px solid #ddd;
        ${({ active, theme: { colors: { light, dark, gardenerBackgroundColor } } }: any) => {
                return `
                        color: ${active ? light : dark};
                        background-color: ${active ? gardenerBackgroundColor : light}
                `;
        }
        }
`;
