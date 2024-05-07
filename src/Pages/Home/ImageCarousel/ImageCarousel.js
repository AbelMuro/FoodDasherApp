import React, {useState, useRef} from 'react';
import {Image} from 'react-native';
import images from './images';
import icons from './icons';
import {
    Container,
    LeftButton,
    RightButton
} from './styles.js';
import { SvgXml } from 'react-native-svg';
import Animated, {useSharedValue, FadeInLeft, FadeInRight, FadeOut} from 'react-native-reanimated';

function ImageCarousel() {
    const [slide, setSlide] = useState(1);  
    const prevSlide = useRef();    

    const handleFadeIn = () => {
        if(prevSlide.current < slide)
            return FadeInRight;
        else
            return FadeInLeft;
    }

    const handleLeft = () => {
        if(slide === 1) return;
        prevSlide.current = slide;
        setSlide(slide - 1);
    }

    const handleRight = () => {
        if(slide === 3) return;
        prevSlide.current = slide;
        setSlide(slide + 1);
    }

    const imageStyles = {
        width: 345, 
        objectFit: 'contain'
    }

    return(
        <Container>
            <LeftButton onPress={handleLeft}>
                <SvgXml xml={icons['left']} width='40px' height='40px'/>
            </LeftButton>
            {slide === 1 && <Animated.Image 
                entering={handleFadeIn()}
                exiting={FadeOut}
                source={images[`slide${slide}`]} 
                style={imageStyles} 
                />}
            {slide === 2 && <Animated.Image 
                entering={handleFadeIn()}
                exiting={FadeOut}
                source={images[`slide${slide}`]} 
                style={imageStyles} 
                />}
            {slide === 3 && <Animated.Image 
                entering={handleFadeIn()}
                exiting={FadeOut}
                source={images[`slide${slide}`]} 
                style={imageStyles} 
                />}
            <RightButton onPress={handleRight}>
                <SvgXml xml={icons['right']} width='40px' height='40px'/>
            </RightButton>
        </Container>
    )
}

export default ImageCarousel;