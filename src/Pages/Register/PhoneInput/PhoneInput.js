import React, {useState, useEffect} from 'react';
import {
    Fieldset,
    Input,
    ErrorMessage,
    Label,
} from './styles.js'
import auth from '@react-native-firebase/auth';

function PhoneInput({handleChange, errors, value, touched}) {
    const [error, setError] = useState(false);

    const handleBlur = async (e) => {
        //phone validation
    }

    useEffect(() => {
        setError(errors.phone);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Phone Number:
            </Label>
            <Input
                style={error && {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                placeholderTextColor={error ? 'red' : 'grey'}
                placeholder='123-4567-8910'
                onChangeText={handleChange('phone')}
                onBlur={handleBlur}
            />            
            {(error === 'empty' && touched) && <ErrorMessage>
                can't be empty
            </ErrorMessage>}
            {(error === 'invalid' && touched) && <ErrorMessage>
                invalid phone number
            </ErrorMessage>}
        </Fieldset>

    )
}

export default PhoneInput;