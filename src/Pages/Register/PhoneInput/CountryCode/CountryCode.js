import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import {
    Container
} from './styles.js'

function CountryCode({getCountryCode}) {
    const [code, setCode] = useState('+1');

    const data = [
        {label: '1', value: '+1'},
        {label: '52', value: '+52'},
        {label: '55', value: '+55'},
        {label: '57', value: '+57'}
    ];

    const handleCode = (item) => {
        setCode(item);
    }

    useEffect(() => {
        getCountryCode(code)
    }, [code])

    return(
        <Container>                                              
            <Dropdown 
                style={{        
                  width: 70,
                  height: 50,
                  paddingHorizontal: 8,
                  position: 'absolute',
                  left: -2,
                  top: 0,                                    
                }}                            
                data={data}
                labelField="label"
                valueField="value"
                iconStyle={{width: 20, height: 20}}                //styles for the arrow
                value={code}
                onChange={handleCode}  
                placeholder=''
                renderLeftIcon={() => (
                    <Text style={{marginRight: 5}}>+</Text>
                )}
            />            
        </Container>

    )
}


export default CountryCode;