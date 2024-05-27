import React from 'react';
import {
    CardDetails,
} from './styles.js';
import CardNumber from './CardNumber';
import ExpirationDate from './ExpirationDate';
import CVC from './CVC';
import ZIPcode from './ZIPcode';

function PaymentInformation() {

    return(
        <>
            <CardNumber/>
            <CardDetails>
                <ExpirationDate/>
                <CVC/>
                <ZIPcode/>
            </CardDetails>
        </>
    )
}

export default PaymentInformation;