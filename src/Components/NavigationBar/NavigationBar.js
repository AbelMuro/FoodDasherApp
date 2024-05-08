import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import {
    NavBar,
    Menu,
    Line
} from './styles.js';
import { SvgXml } from 'react-native-svg';
import icons from './icons'
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

function NavigationBar() {
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();
    const height = useSharedValue(90);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleNavigate = (page) => {
        navigation.navigate(page);
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
        <TouchableOpacity onPress={handleOpen}>
            <Animated.View style={{    
                width: '100%',
                height,
                overflow: 'hidden',
                backgroundColor: 'green',
                display: 'flex',
                alignItems: 'center',
                paddingTop: 20,
                gap: 20}}>
                <SvgXml xml={icons['menu']} width='41px' height='41px'/>
                <Menu>
                    <Line/>
                    <TouchableOpacity onPress={() => handleNavigate('home')}>
                        <SvgXml xml={icons['home']} width='41px' height='41px'/>
                    </TouchableOpacity>
                    <Line/>
                    <TouchableOpacity onPress={() => handleNavigate('search')}>
                        <SvgXml xml={icons['search']} width='41px' height='41px'/>
                    </TouchableOpacity>
                    <Line/>
                    <TouchableOpacity onPress={() => handleNavigate('user')}>
                        <SvgXml xml={icons['user']} width='41px' height='41px'/>
                    </TouchableOpacity>             
                    <Line/>
                    <TouchableOpacity>
                        <SvgXml xml={icons['cart']} width='41px' height='41px'/>
                    </TouchableOpacity>        
                </Menu>
            </Animated.View>
        </TouchableOpacity>

    )
}

export default NavigationBar;