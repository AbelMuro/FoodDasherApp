import React from 'react';
import {Text} from 'react-native';
import {
    CardDetails,
} from './styles.js';
import CardNumber from './CardNumber';
import ExpirationDate from './ExpirationDate';
import CVC from './CVC';

function PaymentInformation() {

    return(
        <>
            <CardNumber/>
            <CardDetails>
                <ExpirationDate/>
                <CVC/>
            </CardDetails>
        </>
    )
}

export default PaymentInformation;