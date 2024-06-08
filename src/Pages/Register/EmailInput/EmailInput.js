import React, {useState, useEffect} from 'react';
import {
    Input,
    Fieldset,
    ErrorMessage,
    Label
} from './styles.js'

function EmailInput({handleChange, handleBlur, errors, touched}) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors.email);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Email:
            </Label>
            <Input
                style={(error && touched.email) && {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                placeholder='johnsmith@gmail.com'
                placeholderTextColor='grey'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
            />
            {(error === 'empty' && touched.email) && <ErrorMessage>
                can't be empty
            </ErrorMessage>}
            {(error === 'invalid' && touched.email) && <ErrorMessage>
                invalid email
            </ErrorMessage>}
        </Fieldset>

    )
}

export default EmailInput;