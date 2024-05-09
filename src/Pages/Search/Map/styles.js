import styled from 'styled-components/native';

export const SearchBox = styled.View`
    width: 250px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: white;
    gap: 15px;
    position: absolute;
    top: 180px;
    left: 60px;
`

export const FieldSet = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

export const SearchButton = styled.Pressable`
    width: 100%;
    height: 35px;
    border-radius: 10px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: white;
`