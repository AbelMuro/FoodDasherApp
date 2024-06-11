import React, {useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {
    Total
} from './styles.js';

function TotalCost(){
    const total = useSelector(state => state.checkout.total);
    const option = useSelector(state => state.checkout.deliveryOption.option);

    const totalCost = useMemo(() => {
        const express = option === 'Express' ? 5 : 0;
        return total + express;
        
    }, [option, total]);


    return(
        <Total>
            Total Cost: ${totalCost.toFixed(2)}
        </Total>
    )
}

export default TotalCost;