import React, {useRef} from 'react';
import DeliveryOptions from './DeliveryOptions';
import {
    Container
} from './styles.js'

function Form() {
    const deliveryOption = useRef();

    const handleDeliveryOption = (option) => {
        deliveryOption.current = option;
    }

    return(
        <Container>
            <DeliveryOptions handleOption={handleDeliveryOption}/>
        </Container>
    )
}

export default Form;