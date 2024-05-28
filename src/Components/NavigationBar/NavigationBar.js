import React, {useState, useEffect} from 'react';
import {
    Menu,
    Line,
    LinkButton
} from './styles.js';
import { SvgXml } from 'react-native-svg';
import icons from './icons'
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from 'react-redux';

function NavigationBar() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const height = useSharedValue(90);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleCart = () => {
        setOpen(false);
        dispatch({type: 'OPEN_CART'});
    }

    const handleNavigate = (page) => {
        navigation.navigate(page);
        setTimeout(() => {
            setOpen(false);
        }, 500)
    }

    useEffect(() => {
        if(open){
            height.value = withTiming(500, {           // width will have its value changed to 100, an linear animation will occur
                duration: 200,                          // in milliseconds
                easing: Easing.linear
            });
        }
        else{
            height.value = withTiming(90, {           // width will have its value changed to 100, an linear animation will occur
                duration: 200,                          // in milliseconds
                easing: Easing.linear
            });
        }
    }, [open])

    return(
            <Animated.View style={{    
                width: '100%',
                height,
                overflow: 'hidden',
                backgroundColor: 'green',
                display: 'flex',
                alignItems: 'center',
                paddingTop: 20,
                gap: 20}}>
                <LinkButton onPress={handleOpen}>
                    <SvgXml xml={icons['menu']} width='41px' height='41px'/>
                </LinkButton>
                <Menu>
                    <Line/>
                    <LinkButton onPress={() => handleNavigate('home')}>
                        <SvgXml xml={icons['home']} width='41px' height='41px'/>
                    </LinkButton>
                    <Line/>
                    <LinkButton onPress={() => handleNavigate('search')}>
                        <SvgXml xml={icons['search']} width='41px' height='41px'/>
                    </LinkButton>
                    <Line/>
                    <LinkButton onPress={() => handleNavigate('user')}>
                        <SvgXml xml={icons['user']} width='41px' height='41px'/>
                    </LinkButton>             
                    <Line/>
                    <LinkButton onPress={handleCart}>
                        <SvgXml xml={icons['cart']} width='41px' height='41px'/>
                    </LinkButton>        
                </Menu>
            </Animated.View>

    )
}

export default NavigationBar;