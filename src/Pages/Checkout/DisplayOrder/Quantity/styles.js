import styled from 'styled-components/native';

export const Container = styled.View`
    width: 150px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
`

export const Increment = styled.Pressable`
    width: 30px;
    height: 30px;
    background-color: green;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Decrement = styled.Pressable`
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TotalQuantity = styled.Text`
    font-size: 15px;
    font-weight: 700;
    color: black;
`