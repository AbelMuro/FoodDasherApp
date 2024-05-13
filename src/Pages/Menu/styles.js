import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    width: 100%;
    background-color: white;
`

export const LogoContainer = styled.View`
    display: flex; 
    gap: 5px; 
    width: 100%;
    margin-top: 30px;
`

export const WorkHours = styled.Text`
    font-family: Pacifico;
    font-size: 25.6px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    color: black;
`

export const DeliveryFee = styled.Text`
    font-family: BebasNeue;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    color: black;
    text-align: center;
`

export const Item = styled.View`
    width: 90%;
    padding: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    border-radius: 30px;
`

export const ItemImage = styled.Image`
    width: 300px;
    height: 300px;   
`

export const ItemName = styled.Text`
    text-transform: uppercase;
    font-family: BebasNeue;
    font-size: 25.6px;
    font-weight: 700;
    text-align: center;
    color: black;
`

export const ItemIngredients = styled.Text`
    width: 80%;
    margin: auto;
    font-size: 16px;
    font-weight: 400;
    color: black;
    text-align: center;
`

export const ItemPrice = styled.Text`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: black;
`

export const SelectItem = styled.Pressable`
    width: 95px;
    height: 35px;
    border-radius: 30px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-size: 13px;
    font-weight: 400;
    color: white;
`