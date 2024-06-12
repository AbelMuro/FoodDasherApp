import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
`

export const OrderDetails = styled.View`
    width: 80%;
    display: flex;
    gap: 15px;
`

export const Detail = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: green;
`

export const Item = styled.View`
    width: 250px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`

export const ItemImage = styled.Image`
    width: 40px;
    height: 40px;
`

export const ItemName = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: green;
`

export const Quantity = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color: green;
`