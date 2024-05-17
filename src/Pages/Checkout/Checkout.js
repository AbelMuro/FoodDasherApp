import React, {useState, useEffect} from 'react';
import images from '~/Common/images';
import {useSelector} from 'react-redux';
import {
    Container    
} from './styles.js';
import MapView, {Marker} from 'react-native-maps';

function Checkout() {
    const location = useSelector(state => state.location.latlng);    
    const cart = useSelector(state => state.cart.items);

    useEffect(() => {
        console.log(location)
    }, [location])

    return(
        <Container source={images['background']}>
            <MapView> 

            </MapView>
        </Container>
    )
}

export default Checkout;