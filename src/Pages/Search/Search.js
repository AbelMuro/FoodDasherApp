import React from 'react';
import {ScrollView} from 'react-native';
import Map from './Map';
import {
    Container,
    Instructions,
    Instruction,
    Title
} from './styles.js';
import images from '~/Common/images';

function Search() {
    return(
        <ScrollView>
            <Container source={images['background']}>
                <Instructions>
                    <Title>
                        INSTRUCTIONS: 
                    </Title>
                    <Instruction>
                        1: Enter your address
                    </Instruction>
                    <Instruction>
                        2: Select restaurant
                    </Instruction>
                    <Instruction>
                        3: Click on one of the BLUE markers in the map
                    </Instruction>
                    <Instruction>
                        4: Enter your address
                    </Instruction>
                </Instructions>
                <Map/>
            </Container>
        </ScrollView>
    )
}

export default Search;