import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.View`
    width: 90%;
    padding: 20px;
    border-radius: 10px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
`

export const Title = styled.Text`
    font-family: BebasNeue;
    font-size: 30px;
    color: white;
    text-align: center;
`

export const Submit = styled.Pressable`
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-size: 17px;
    color: green;
`