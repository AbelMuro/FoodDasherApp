import styled from 'styled-components/native';

export const Total = styled.Text`
    width: 90%;
    text-align: center;
    font-size: 27px;
    font-weight: 700;
    color: black;
`

export const Quantity = styled.Text`
    font-weight: 400;
    font-size: 26px;
    color: black;
`

export const Container = styled.View`
    width: 90%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 30px;
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

export const ButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

export const AddButton = styled.Pressable`
    width: 116px;
    height: 35px;
    border-radius: 30px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BackButton = styled.Pressable`
    width: 91px;
    height: 35px;
    border-radius: 30px;
    background-color: rgb(2, 66, 2);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`