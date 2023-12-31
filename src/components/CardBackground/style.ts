import { styled } from "styled-components"

export interface CardBackgroundProps {
    width?: string;
  }

export const CardBackgroundStyle = styled.div<CardBackgroundProps>`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 45px 80px;
background-color: var(--white-15);
border-radius: 8px;
box-shadow: 0px 5px 80px 0px #39069E;
height: 90vh;
width: ${props => props.width || "100%"};
`