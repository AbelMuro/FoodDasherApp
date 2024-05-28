import styled from 'styled-components/native';

export const Container = styled.View`
    width: 90%;
    display: flex;
    gap: 20px;
`
export const ItemContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px
`

export const ItemImage = styled.Image`
    width: 50px;
    height: 50px;
`

export const ItemDetails = styled.View`
    width: 200px;
    display: flex;
    gap: 5px;
`

export const ItemName = styled.Text`
    font-size: 17px;
    font-weight: 700;
    color: black;
`


export const ExcludedIngredients = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: rgb(51, 51, 51);
`

export const ItemPrice = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: black;
`