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
                style={error && {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                placeholder='johnsmith@gmail.com'
                placeholderTextColor={error ? 'red' : 'grey'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
            />
            {(error === 'empty' && touched) && <ErrorMessage>
                can't be empty
            </ErrorMessage>}
            {(error === 'invalid' && touched) && <ErrorMessage>
                invalid email
            </ErrorMessage>}
        </Fieldset>

    )
}

export default EmailInput;