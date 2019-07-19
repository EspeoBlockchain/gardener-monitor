import styled from 'styled-components';

export const Loader = styled.div`
    animation: fadeInOut 2s infinite;

    @keyframes fadeInOut {
        0% {opacity: 1};
        50% {opacity: 0};
        100% {opacity: 1};
    }
`; 