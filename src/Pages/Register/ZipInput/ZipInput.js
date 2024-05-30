import React, {useState, useEffect} from 'react';
import {
    Fieldset,
    Input,
    ErrorMessage,
    Label
} from './styles.js';

function ZipInput({handleChange, handleBlur, errors, touched}) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(errors.zip)
    }, [errors])

    return(
        <Fieldset>
            <Label>
                Enter ZIP:
            </Label>
            <Input
                style={(error && touched.zip) && {borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
                placeholderTextColor={(error && touched.zip) ? 'red' : 'grey'}
                placeholder='94806'
                onChangeText={handleChange('zip')}
                onBlur={handleBlur('zip')}
            />            
            {(error === 'empty' && touched.zip) && <ErrorMessage>
                can't be empty
            </ErrorMessage>}
        </Fieldset>

    )
}

export default ZipInput;