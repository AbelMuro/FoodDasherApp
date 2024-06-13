import React, {useMemo, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {
    Total
} from './styles.js';

function TotalCost(){
    const total = useSelector(state => state.checkout.total);
    const option = useSelector(state => state.checkout.deliveryOption.option);
    const tip = useSelector(state => state.checkout.tip);

    const totalCost = useMemo(() => {
        const express = option === 'Express' ? 5 : 0;
        return total + express + Number(tip);
        
    }, [option, total, tip]);


    return(
        <Total>
            Total Cost: ${totalCost.toFixed(2)}
        </Total>
    )
}

export default TotalCost;