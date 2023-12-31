import { styled } from "styled-components"; 

export interface AlertProps {
    backgroundColor: string;
}

export const AlertStyled = styled.div<AlertProps>`
    width: 260px;
    height: 90px;
    padding: 0 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-family: 'Montserrat';
    font-weight: 700;
    color: var(--off-white);
    background-color: ${props => props.backgroundColor};
    position: fixed;
    right: 4.5rem;
    bottom: 5%;
    border-radius: 4px;
    animation: desliza .5s;

    @keyframes desliza {
        from{
            opacity: 0;
            right: -260px;
        }
        to {
            opacity: 1;
            right: 4.5rem;
        }
    }
`