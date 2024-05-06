import React, {useState} from 'react';
import {Image} from 'react-native';
import images from './images';
import icons from './icons';
import {
    Container,
    LeftButton,
    RightButton
} from './styles.js';
import { SvgXml } from 'react-native-svg';

function ImageCarousel() {
    const [slide, setSlide] = useState(1);

    const handleLeft = () => {
        if(slide === 1) return;
        setSlide(slide - 1);
    }

    const handleRight = () => {
        if(slide === 3) return;
        setSlide(slide + 1);
    }

    return(
        <Container>
            <LeftButton onPress={handleLeft}>
                <SvgXml xml={icons['left']} width='40px' height='40px'/>
            </LeftButton>
            <Image source={images[`slide${slide}`]} style={{width: 345, objectFit: 'contain'}} />
            <RightButton onPress={handleRight}>
                <SvgXml xml={icons['right']} width='40px' height='40px'/>
            </RightButton>
        </Container>
    )
}

export default ImageCarousel;