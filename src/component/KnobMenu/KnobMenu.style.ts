import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

export const Circle = styled.ul`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: gray;

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`

export const Item = styled.li`
  position: absolute;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  background-color: blue;
  transform-origin: 50% 50%;
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