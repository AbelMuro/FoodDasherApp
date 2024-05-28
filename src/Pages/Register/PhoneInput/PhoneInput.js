import React from 'react';
import {
    Input
} from './styles.js'

function PhoneInput({handleChange, handleBlur, errors, touched}) {
    return(
        <Input
            placeholder='123-4567-8910'
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
        />
    )
}

export default PhoneInput;