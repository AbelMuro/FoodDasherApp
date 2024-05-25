import React, {useState, useImperativeHandle, forwardRef} from 'react';
import { Container } from './styles';
import { Dropdown } from 'react-native-element-dropdown';

const SelectRestaurant = forwardRef((props, ref) => {
    const [value, setValue] = useState(null);
    const [focus, setFocus] = useState(false);
    
    const dropdownStyles = {
        width: 220,
        height: 50,
        paddingHorizontal: 8,
        position: 'absolute',
        right: -5,
        top: -10,
    }

    const data = [
        {label: 'McDonalds', value: 'McDonalds'},
        {label: 'Jack in the Box', value: 'Jack%20in%20the%20Box'}
    ];

    useImperativeHandle(ref, () => ({
        get state() {
            return value;
        }
    }))

    return(
        <Container>
            <Dropdown 
                style={dropdownStyles}
                data={data}
                labelField="label"
                valueField="value"
                iconStyle={{width: 20, height: 20}}
                value={value}
                placeholder={!focus ? 'Select Restaurant' : '...'}
                placeholderStyle={{paddingLeft: 10, color: 'black'}}
                selectedTextStyle={{paddingLeft: 10, color: 'black'}}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={item => setValue(item.value)}
            />            
        </Container>
    )
})

export default SelectRestaurant;