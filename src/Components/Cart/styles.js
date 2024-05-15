import styled from 'styled-components/native';

export const CartTitle = styled.Text`
    font-size: 40px;
    font-weight: 700;
    color: white;
`

export const AllItems = styled.ScrollView`
    display: flex;
    gap: 20px;
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