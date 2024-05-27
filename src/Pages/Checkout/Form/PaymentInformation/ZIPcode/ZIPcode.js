import React, {useState} from 'react';
import {
    Fieldset,
    ZIP,
    Label,
    ErrorMessage
} from './styles.js';
import {useDispatch, useSelector} from 'react-redux';

function ZIPcode() {
    const zip = useSelector(state => state.checkout.creditCard.zip);
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const handleZip = (text) => {
        setError(false);
        dispatch({type: 'UPDATE_CARD_ZIP', zip: text});
    }   

    const handleBlur = () => {
        if(!zip)
            setError('empty')
    }

    return(
        <Fieldset>
            <Label>
                Zip Code
            </Label>
            <ZIP 
                value={zip}
                onChangeText={handleZip}
                onBlur={handleBlur}
                placeholder='ZIP'
                placeholderTextColor={error === 'empty' ? 'red' : 'grey'}
                style={error === 'empty' && {borderColor: 'red'}}
            />
            {error === 'empty' && 
                <ErrorMessage>
                      can't be empty  
                </ErrorMessage>
            }
        </Fieldset>
    )
}

export default ZIPcode;