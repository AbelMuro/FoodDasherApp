import React from 'react';
import {
    Fieldset,
    EnterTip,
    Label
} from './styles.js';
import {useDispatch, useSelector} from 'react-redux';

function Tip() {
    const dispatch = useDispatch();
    const tip = useSelector(state => state.checkout.tip);

    const handleTip = (text) => {
        if(text.match(/^\d+.\d{1,2}$/) || text.match(/^\d+.$/) || text.match(/^\d+$/) || text === '')
        dispatch({type: 'UPDATE_TIP', tip: text});
    }

    const handleBlur = () => {
        dispatch({type: 'UPDATE_TIP', tip: Number(tip).toFixed(2)})
    }

    return(
        <Fieldset>
            <Label>
                Enter Tip
            </Label>
            <EnterTip 
                value={tip}
                onChangeText={handleTip}
                onBlur={handleBlur}
                placeholder='$'
                keyboardType='numeric'
                />
        </Fieldset>
    )
}

export default Tip;