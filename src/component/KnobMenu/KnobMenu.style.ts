import styled, {css} from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

export const Circle = styled.ul<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: black;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  z-index: 100;
  
  //transition: transform 0.25s ease-in;

  ${({isActive}) => {
    return isActive ?
            css`
              display: block;
              & > * {
                display: block;
              }
            ` : 
            css`
              display: none;
              & > * {
                display: none;
              }
            `;
  }}
`

export const InnerCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 30%;
  height: 30%;

  border-radius: 50%;
  background-color: dimgray;

  z-index: 200;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Item = styled.li`
  position: absolute;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: inherit;

  &:hover {
    background-color: gray;
    transition: background-color 0.25s ease-in;
  }
`

export const VerticalLine = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: black;
`

export const HorizonLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 1px;
  background-color: black;
`

export const ItemLine = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;

  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 1px black solid;
`

export const Button = styled.button`
  width: 100%;
  height: 100%;

  color: white;
`;

