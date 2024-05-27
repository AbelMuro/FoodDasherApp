import React from 'react';
import {Alert} from 'react-native';
import {
    Submit, 
    ButtonText,
} from './styles.js';
import {useSelector} from 'react-redux';

function SubmitOrder() {
    const {number, cvc, zip} = useSelector(state => state.checkout.creditCard);

    const handleSubmit = () => {
        if(!number){
            Alert.alert('Enter card number');
            return;
        }
        else if(!cvc){
            Alert.alert('Enter CVC');
            return;
        }
        else if(!zip){
            Alert.alert('Enter ZIP');
            return;
        }
            
        Alert.alert('Order has been placed');
    }

    return(
        <Submit onPress={handleSubmit}> 
            <ButtonText>
                Place Order
            </ButtonText>
        </Submit>
    )
}

export default SubmitOrder;