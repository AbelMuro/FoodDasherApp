import React, {useState, useEffect, useRef} from 'react';
import { SvgXml } from 'react-native-svg';
import icons from '~/Common/icons';
import {
    Container,
    Decrement,
    Increment,
    DisplayQuantity
} from './styles.js'
import { useDispatch } from 'react-redux';

function Quantity({prevQuantity, itemID}) {
    const [quantity, setQuantity] = useState(prevQuantity);
    const dispatch = useDispatch();

    const handleDecrement = () => {
        dispatch({type: 'UPDATE_CART', item: {id: itemID, quantity: quantity - 1}});        //if i put the dispatch function in a useEffect, it will create an infinite loop
        setQuantity(quantity - 1);
    }

    const handleIncrement = () => {
        dispatch({type: 'UPDATE_CART', item: {id: itemID, quantity: quantity + 1}});
        setQuantity(quantity + 1);
    }

    useEffect(() => {
        setQuantity(prevQuantity);
    }, [prevQuantity])

    useEffect(() => {
        if(quantity === 0)
            dispatch({type: 'REMOVE_ITEM', item: {id: itemID}})
    }, [quantity])

    return(
        <Container>
            <Decrement onPress={handleDecrement}>
                <SvgXml xml={icons['minus']} width={'35px'} height={'15px'}/>
            </Decrement>
            <DisplayQuantity>
                {quantity}                
            </DisplayQuantity>
            <Increment onPress={handleIncrement}>
                <SvgXml xml={icons['plus']} width={'35px'} height={'15px'}/>
            </Increment>
        </Container>
    )
}

export default Quantity;