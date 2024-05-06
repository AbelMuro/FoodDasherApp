import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 350px;
    background-color: green;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LeftButton = styled.Pressable`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: absolute;
    left: 10px;
    top: 50%;
    z-index: 20;
`

export const RightButton = styled.Pressable`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: absolute;
    right: 10px;
    top: 50%;
    z-index: 20;
`

