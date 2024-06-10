import React, {useMemo} from 'react';
import {useSelector} from 'react-redux'
import {
    Total
} from './styles.js';

function TotalCost(){
    const total = useSelector(state => state.checkout.total);
    const deliveryOption = useSelector(state => state.checkout.deliveryOption);

    const totalCost = useMemo(() => {
        const express = deliveryOption === 'Express' ? 5 : 0;
        return total + express;
        
    }, [deliveryOption, total])

    return(
        <Total>
            Total Cost: ${totalCost.toFixed(2)}
        </Total>
    )
}

export default TotalCost;