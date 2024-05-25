import React, {useState, useEffect} from 'react';
import {
    CardContainer,
    CreditCard,
    CardIcon
} from './styles.js';
import icons from './icons';

function PaymentInformation() {
    const [number, setNumber] = useState('');

    const handleChange = (text) => {
        setNumber(text);
    }

    useEffect(() => {
        //console.log(number.match(/.{0,4}/g).join(' '));
    }, [number])

    return(
        <>
            <CardContainer>
                <CreditCard 
                    value={number}
                    onChangeText={handleChange}
                    placeholder='xxxx xxxx xxxx xxxx'
                    />    
                <CardIcon source={icons['CreditCard']} />            
            </CardContainer>
        </>
    )
}

export default PaymentInformation;