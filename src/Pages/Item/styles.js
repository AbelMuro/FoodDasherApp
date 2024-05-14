import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 50px;
    gap: 10px;
`

export const ItemTitle = styled.Text`
    font-size: 25.6px;
    font-family: BebasNeue;
    color: black;
`

export const ItemIngredients = styled.View`
    display: flex;
    justify-content: center;
    gap: 10px;
`

export const Message = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: black;
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