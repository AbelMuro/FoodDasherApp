import React from 'react';
import DeliveryOptions from './DeliveryOptions';
import DropOffOptions from './DropOffOptions';
import DropOffInstructions from './DropOffInstructions';
import PaymentInformation from './PaymentInformation';
import TotalCost from './TotalCost';
import SubmitOrder from './SubmitOrder';
import Tip from './Tip';
import {
    Container,
    Label
} from './styles.js'

function Form() {

    return(
        <Container>
            <Label>
                Select Delivery Option
            </Label>
            <DeliveryOptions/>
            <Label>
                Drop-off Options
            </Label>
            <DropOffOptions/>    
            <Label>
                Drop-off Instructions
            </Label>  
            <DropOffInstructions/>  
            <Label>
                Payment Information
            </Label>
            <PaymentInformation/>
            <Label>
                Tip
            </Label>
            <Tip/>
            <TotalCost/>
            <SubmitOrder/>
        </Container>        
    )
}

export default Form;