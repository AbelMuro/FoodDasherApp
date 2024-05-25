import React, {useState, useMemo} from 'react';
import {useSelector} from 'react-redux'
import DeliveryOptions from './DeliveryOptions';
import DropOffOptions from './DropOffOptions';
import DropOffInstructions from './DropOffInstructions';
import PaymentInformation from './PaymentInformation';
import {
    Container,
    Message
} from './styles.js'

function Form() {
    const cart = useSelector(state => state.cart.items);
    const deliveryOption = useSelector(state => state.checkout.deliveryOption);

    const cost = useMemo(() => {
        let express = deliveryOption === 'Express' ? 5 : 0;
        return cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0) + express;
    }, [deliveryOption])

    return(
        <Container>
            <Message>
                Select Delivery Option
            </Message>
            <DeliveryOptions/>
            <Message>
                Drop-off Options
            </Message>
            <DropOffOptions/>    
            <Message>
                Drop-off Instructions
            </Message>  
            <DropOffInstructions/>  
            <Message>
                Payment Information
            </Message>
            <PaymentInformation/>
            <Message>
				Total Cost: ${cost.toFixed(2)}
			</Message>
        </Container>        
    )
}

export default Form;