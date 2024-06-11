import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 50px 0px;
    justify-content: center;
    align-items: center;
`   

export const AccountContainer = styled.View`
    width: 90%;
    padding: 50px 25px 20px 25px;
    display: flex;
    background-color: green;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    gap: 15px;
    position: relative;
`

export const AccountImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 100px;
    position: absolute;
    top: -40px;
    left: 45%;
`

export const AccountDetails = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 400;
    align-self: start;
`

export const Button = styled.Pressable`
    width: 100%;
    height: 50px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-size: 17px;
    color: green;
`