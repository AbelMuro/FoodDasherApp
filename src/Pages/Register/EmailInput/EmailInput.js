import React from 'react';
import {
    Input
} from './styles.js'

function EmailInput({handleChange, handleBlur}) {
    return(
        <Input
            placeholder='johnsmith@gmail.com'
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
        />
    )
}

export default EmailInput;