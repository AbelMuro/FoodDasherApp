import React, {useEffect} from 'react';
import images from '~/Common/images';
import {useSelector} from 'react-redux';
import {
    Container    
} from './styles.js';

function Checkout() {
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        console.log(cart);
    }, [cart])

    return(
        <Container source={images['background']}>

        </Container>
    )
}

export default Checkout;