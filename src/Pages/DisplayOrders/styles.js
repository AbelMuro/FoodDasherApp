import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    height: 100%;
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`   

export const Order = styled.View`
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

export const OrderDetails = styled.Text`
    font-size: 20px;
    color: white;
    font-family: BebasNeue;
`
