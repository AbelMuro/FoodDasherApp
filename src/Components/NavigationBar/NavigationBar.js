import React from 'react';
import {
    NavBar,
    Menu,
    Line
} from './styles.js';
import { SvgXml } from 'react-native-svg';
import icons from './icons'
//import Animated, { useSharedValue, WitTiming, Easing } from 'react-native-reanimated';

//remember to do pod install for iOS
function NavigationBar() {
    return(
        <NavBar>
            <SvgXml xml={icons['menu']} width='41px' height='41px'/>
            <Menu>
                <Line/>
                <SvgXml xml={icons['home']} width='41px' height='41px'/>
                <Line/>
                <SvgXml xml={icons['search']} width='41px' height='41px'/>
                <Line/>
                <SvgXml xml={icons['user']} width='41px' height='41px'/>
                <Line/>
                <SvgXml xml={icons['cart']} width='41px' height='41px'/>
            </Menu>
        </NavBar>
    )
}

export default NavigationBar;