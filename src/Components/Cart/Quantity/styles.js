import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
`

export const Decrement = styled.Pressable`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Increment = styled.Pressable`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DisplayQuantity = styled.Text`
    font-size: 20px;
    color: white;

`