import React, {useState, useEffect} from 'react';
import {
    Fieldset, 
    Label,
    Input,
    ErrorMessage,
    InputContainer
} from './styles.js';
import CountryCode from '~/Components/CountryCode';

function PhoneInput({handleChange, handleBlur, errors, getCountryCode}) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Phone:
            </Label>
            <InputContainer>
                <CountryCode getCountryCode={getCountryCode}/>
                <Input
                    style={error && {borderColor: 'red', borderWidth: 2, borderStyle: 'solid'}}
                    placeholderTextColor={'grey'}
                    placeholder='123-456-7890'
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType='phone-pad'
                />             
            </InputContainer>     
            {error === 'empty' && 
                <ErrorMessage>
                    can't be empty
                </ErrorMessage>}     
            {error === 'invalid' && 
                <ErrorMessage>
                    invalid phone number
                </ErrorMessage>}   
        </Fieldset>

    )
}

export default PhoneInput;