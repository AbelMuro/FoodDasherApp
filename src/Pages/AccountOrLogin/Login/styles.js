import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.View`
    width: 90%;
    padding: 25px;
    background-color: green;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    padding-bottom: 60px;
`

export const Title = styled.Text`
    font-size: 40px;
    color: white;
    font-family: BebasNeue;
`

export const Submit = styled.Pressable`
    width: 100%;
    height: 50px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-size: 16px;
    color: green;
    font-weight: 400;
`