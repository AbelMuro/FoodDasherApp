import React, {useState, useEffect} from 'react';
import {
    Fieldset,
    Input,
    ErrorMessage,
    Label
} from './styles.js'
import auth from '@react-native-firebase/auth';

function PhoneInput({handleChange, handleBlur,  errors, touched}) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors.phone);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Phone Number:
            </Label>
            <Input
                style={(error && touched.phone)&& {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                placeholderTextColor={(error && touched.phone) ? 'red' : 'grey'}
                placeholder='123-4567-8910'
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType='phone-pad'
            />            
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