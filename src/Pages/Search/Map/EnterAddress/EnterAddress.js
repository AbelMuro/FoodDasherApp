import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {AddressInput} from './styles.js';

const EnterAddress = forwardRef((props, ref) => {
    const [address, setAddress] = useState('');

    const handleAddress = (text) => {
        setAddress(text);
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return address;
        },
        newAddress(state) {
            setAddress(state);
        }
    }))


    return(
        <AddressInput 
            placeholder='Enter Address'
            value={address}
            onChangeText={handleAddress}
        />
    )
})

export default EnterAddress;