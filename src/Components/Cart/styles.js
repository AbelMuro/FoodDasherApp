import styled from 'styled-components/native';

export const CartTitle = styled.Text`
    font-size: 40px;
    font-weight: 700;
    color: white;
    text-align: center;
`

export const CartTotal = styled.Text`
    font-size: 20px;
    font-weight: 400;
    color: white;
`

export const AllItems = styled.ScrollView`
    height: 75%;
    margin-bottom: 70px;
`

export const Item = styled.View`
    width: 200px;
    display: flex;
    gap: 10px;
`

export const ItemDesc = styled.Text`
    font-size: 20px;
    font-weight: 400;
    color: white;
`

export const EmptyMessage = styled.Text`
    font-size: 25px;
    font-weight: 700;
    color: white;
`

export const CheckoutBox = styled.View`
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 1000;
    elevation: 1000;
    background-color: green;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
`

export const CheckoutButton = styled.Pressable`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: white;
    font-weight: 400;
`