import React from 'react';
import {
    Input
} from './styles.js';

function ZipInput({handleChange, handleBlur, errors, touched}) {
    return(
        <Input
            placeholder='94806'
            onChangeText={handleChange('zip')}
            onBlur={handleBlur('zip')}
        />
    )
}

export default ZipInput;