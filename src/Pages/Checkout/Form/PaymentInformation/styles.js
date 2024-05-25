import styled from 'styled-components/native';


export const CardContainer = styled.View`
    position: relative;
`

export const CreditCard = styled.TextInput`
    width: 90%;
    height: 50px;
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
    top: 2px;
`