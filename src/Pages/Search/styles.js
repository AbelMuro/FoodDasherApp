import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const Instructions = styled.View`
    width: 200px;
    display: flex;
    gap: 5px;
    margin-top: 20px;
`

export const Title = styled.Text`
    color: black;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: underline;
    margin-bottom: 10px;
`

export const Instruction = styled.Text`
    color: black;
`