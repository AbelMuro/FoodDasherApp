import React, {useState, useEffect} from 'react';
import {
    Fieldset,
    InputContainer,
    Input,
    ErrorMessage,
    Label
} from './styles.js';
import CountryCode from './CountryCode';

function PhoneInput({handleChange, handleBlur,  errors, touched, getCountryCode}) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors.phone);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Phone Number:
            </Label>
            <InputContainer>
                <CountryCode getCountryCode={getCountryCode}/>
                <Input
                    style={(error && touched.phone)&& {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                    placeholderTextColor={(error && touched.phone) ? 'red' : 'grey'}
                    placeholder='123-4567-8910'
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType='phone-pad'
                />             
            </InputContainer>
           
            {(error === 'empty' && touched.phone) && <ErrorMessage>
                can't be empty
            </ErrorMessage>}
            {(error === 'invalid' && touched.phone) && <ErrorMessage>
                invalid phone number
            </ErrorMessage>}
        </Fieldset>

    )
}

export default PhoneInput;