import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    height: 100%;
    padding: 50px 0px;
    display: flex;
    gap: 20px;
    align-items: center;
`   

export const Order = styled.View`
    width: 90%;
    padding: 25px;
    display: flex;
    background-color: green;
    border-radius: 20px;
    justify-content: center;
    gap: 15px;
    position: relative;
`

export const Details = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 400;
`

export const Title = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 700;
`

export const Button = styled.Pressable`
    width: 100%;
    height: 60px;
    border-radius: 15px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: green;
`