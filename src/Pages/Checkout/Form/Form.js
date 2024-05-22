import React, {useState, useMemo} from 'react';
import {useSelector} from 'react-redux'
import DeliveryOptions from './DeliveryOptions';
import {
    Container,
    Message
} from './styles.js'

function Form() {
    const [deliveryOption, setDeliveryOption] = useState('Standard');
    const cart = useSelector(state => state.cart.items);

    const cost = useMemo(() => {
        let express = deliveryOption === 'Express' ? 5 : 0;
        return cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0) + express;
    }, [deliveryOption])

    return(
        <Container>
            <DeliveryOptions handleOption={setDeliveryOption}/>
            <Message>
				Total Cost: ${cost.toFixed(2)}
			</Message>
        </Container>        
    )
}

export default Form;