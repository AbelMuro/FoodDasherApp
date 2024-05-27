import styled from 'styled-components/native';

export const Fieldset = styled.View`
    position: relative;
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
`

export const CreditCard = styled.TextInput`
    width: 100%;
    height: 50px;
    color: black;
    border-radius: 10px;
    border-style: solid;
    border-color: green;
    border-width: 1px;
    font-size: 25px;
    padding: 10px;
    padding-left: 50px;
`

export const CardIcon = styled.Image`
    width: 30px;
    height: 50px;
    object-fit: contain;
    position: absolute;
    left: 10px;
    top: 27px;
`

export const ErrorMessage = styled.Text`
    width: 150px;
    color: red;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    bottom: -20px;
    left: 47px;
`

export const Label = styled.Text`
    font-size: 15px;
    color: black;
    margin-bottom: -15px;
    font-weight: 700;
`
