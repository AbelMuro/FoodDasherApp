import React, {useState, useEffect} from 'react';
import {
    Container,
    Increment,
    Decrement,
    TotalQuantity,
} from './styles.js';
import icons from '~/Common/icons';
import { SvgXml } from 'react-native-svg';
import { useDispatch } from 'react-redux';

function Quantity({quantity, id}) {
    const [quant, setQuant] = useState(quantity);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch({type: 'UPDATE_CART', item: {id, quantity: quant + 1}})
        setQuant(quant + 1);
    }

    const handleDecrement = () => {
        dispatch({type: 'UPDATE_CART', item: {id, quantity: quant - 1}})
        setQuant(quant - 1);
    }


    useEffect(() => {
        setQuant(quantity);
    }, [quantity])

    useEffect(() => {
        if(quant === 0)
            dispatch({type: 'REMOVE_ITEM', item: {id}})
    }, [quant])

    return(
        <Container>
            <Decrement onPress={handleDecrement}>
                <SvgXml xml={icons['minus']} width={'15px'} height={'15px'}/>
            </Decrement>
            <TotalQuantity>
                {quant}
            </TotalQuantity>
            <Increment onPress={handleIncrement}>
                <SvgXml xml={icons['plus']} width={'15px'} height={'15px'}/>
            </Increment>
        </Container>
    )
}

export default Quantity;