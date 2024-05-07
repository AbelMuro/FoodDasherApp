import styled from 'styled-components/native';

export const Header = styled.ImageBackground`
    width: 100%;
    height: 665px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Content = styled.View`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`

export const Logo = styled.View`
    width: 300px;
    height: 101px;
    border-radius: 30px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LogoText = styled.Text`
    font-family: Pacifico;
    font-size: 46.4px;
    color: white;
`

export const Title = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 28.8px;
    font-family: Arial;
    color: rgb(90, 88, 88);
`


export const Container = styled.View`
    width: 90%;
    height: 50px;
    margin: auto;
    border-top-style: solid;
    border-top-width: 3px;
    border-top-color: black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`


export const TextBox = styled.View`
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right-width: 3px;
    border-right-color: black;
    border-right-style: solid;
`

export const Description = styled.Text`
    color: rgb(66, 65, 65);
    width: 80%;
    text-align: center;
`

export const Message = styled.Text`
    text-align: center;
    font-family: BebasNeue;
    color: rgb(128, 98, 0);
    font-size: 24px;
`


export const SignUpButton = styled.Pressable`
    background-color: green;
    width: 73px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: white;
`

export const CompanyDetails = styled.ImageBackground`
    width: 100%;
    height: 520px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const CompanyTitle = styled.Text`
    width: 80%;
    text-align: center;
    font-family: sans-serif;
    color: rgb(49, 38, 0);
    font-size: 24px;
    font-weight: 700;
`

export const CompanyDetail = styled.Text`
    width: 70%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
`

export const Footer = styled.View`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: green;
`