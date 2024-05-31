import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {
    Fieldset, 
    Label,
    Input,
    ErrorMessage
} from './styles.js';

function PhoneInput({handleChange, handleBlur, errors}) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Phone:
            </Label>
            <Input
                placeholder='123-4567-8910'
                placeholderTextColor={error ? 'red': 'grey'}
                style={error && {borderColor: 'red', borderWidth: 2, borderStyle: 'solid'}}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType='phone-pad'
            />      
            {error === 'empty' && 
                <ErrorMessage>
                    can't be empty
                </ErrorMessage>}      
        </Fieldset>

    )
}

export default PhoneInput;