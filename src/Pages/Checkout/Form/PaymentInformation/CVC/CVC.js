import React, {useState} from 'react';
import {
    Fieldset,
    CVCinput,
    Label,
    ErrorMessage
} from './styles.js';

function CVC(){
    const [cvc, setCvc] = useState('');
    const [error, setError] = useState(false);

    const handleCVC = (text) => {
        if(text.match(/\D/g))
                return;
        setError(false);
        setCvc(text);
    }

    const handleBlur = () => {
        if(!cvc)
            setError('empty')
        else if(cvc.length < 3)
            setError('invalid cvc')
    }
4
    return(
        <Fieldset>
            <Label>
                CVC
            </Label>
            <CVCinput
                value={cvc}
                onChangeText={handleCVC}
                style={error && {borderColor: 'red', color: 'red'}}
                placeholder='CVC'
                placeholderTextColor={error === 'empty' ? 'red': 'grey'}
                maxLength={3}
                keyboardType='numeric'
                onBlur={handleBlur}
            />
            {error === 'empty' && 
                <ErrorMessage>
                    can't be empty
                </ErrorMessage>
            }
            {error === 'invalid cvc' && 
                <ErrorMessage>
                    invalid cvc
                </ErrorMessage>
            }
        </Fieldset>
    )
}

export default CVC;