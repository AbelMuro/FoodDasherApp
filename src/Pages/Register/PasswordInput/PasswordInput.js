import React, {useEffect, useState} from 'react';
import {
    Input,
    Fieldset,
    ErrorMessage,
    Label
} from './styles.js';

function PasswordInput({handleChange, handleBlur, errors, touched}){
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors.password);
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter Password:
            </Label>
            <Input
                style={(error && touched.password) && {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                type='password'
                placeholder='password'
                secureTextEntry={true}
                placeholderTextColor={(error && touched.email) ? 'red' : 'grey'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
            />
            {(error === 'empty' && touched.password) && <ErrorMessage>
                can't be empty
            </ErrorMessage>}
            {(error === 'invalid' && touched.password) && <ErrorMessage>
                invalid email
            </ErrorMessage>}
        </Fieldset>

    )
}

export default PasswordInput