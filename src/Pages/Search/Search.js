import React, {useState} from 'react';
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
    const [scrollYPosition, setScrollYPosition] = useState(0);

    return(
        <ScrollView contentOffset={{
            y: scrollYPosition,
            x: 0
        }}> 
            <Container source={images['background']}>
                <Instructions>
                    <Title>
                        INSTRUCTIONS: 
                    </Title>
                    <Instruction>
                        1: Enter your address
                    </Instruction>
                    <Instruction>
                        2: Select a restaurant
                    </Instruction>
                    <Instruction>
                        3: Press on Search Restaurants
                    </Instruction>
                    <Instruction>
                        4: Click on one of the BLUE markers in the map
                    </Instruction>
                    <Instruction>
                        5: Press on Select
                    </Instruction>
                </Instructions>
                <Map setScrollYPosition={setScrollYPosition}/>
            </Container>
        </ScrollView>
    )
}

export default Search;