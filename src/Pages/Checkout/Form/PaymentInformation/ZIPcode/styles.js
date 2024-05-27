import styled from 'styled-components/native';

export const Fieldset = styled.View`
    width: 30%;
    height: 50px;
    display: flex;
    gap: 20px;
    position: relative;
`

export const ZIP = styled.TextInput`
    width: 100%;
    height: 50px;
    color: black;
    font-size: 20px;
    border-radius: 10px;
    border-style: solid;
    border-color: green;
    border-width: 1px;
    padding-left: 15px;
`

export const ErrorMessage = styled.Text`
    width: 150px;
    color: red;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    bottom: -45px;
    left: 10px;
`

export const Label = styled.Text`
    font-size: 15px;
    color: black;
    margin-bottom: -15px;
    font-weight: 700;
`

