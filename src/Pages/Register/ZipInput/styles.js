import styled from 'styled-components/native';

export const Fieldset = styled.View`
    width: 100%;
    position: relative;
    display: flex;
    gap: 10px;
`

export const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    padding-left: 20px;
`
export const ErrorMessage = styled.Text`
    font-size: 14px;
    color: red;
    position: absolute;
    bottom: -20px;
    left: 5px;
`   

export const Label = styled.Text`
    font-size: 17px;
    font-weight: 400;
    color: white;
`