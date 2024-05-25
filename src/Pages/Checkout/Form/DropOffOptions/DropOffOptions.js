import React, {memo} from 'react';
import {Container} from './styles.js';
import RadioGroup from 'react-native-radio-buttons-group';
import {useSelector, useDispatch} from 'react-redux';

function DropOffOptions() {
    const option = useSelector(state => state.checkout.dropOffOption);
    const dispatch = useDispatch();

    const options = [
        {
            id: 'Hand it to me',                             
            label: 'Hand it to me',
            value: 'Hand it to me',
            borderColor: 'green',            
            color: 'green',                 
            labelStyle: {color: 'black'}      
        },
        {
            id: 'Leave it at my door',
            label: 'Leave it at my door',
            value: 'Leave it at my door',
            borderColor: 'green',            
            color: 'green',                  
            labelStyle: {color: 'black'}      
        }
    ]

    const handleOption = (option) => {
        dispatch({type: 'UPDATE_DROPOFF_OPTION', option})
    }

    return(
            <RadioGroup
                radioButtons={options}
                onPress={handleOption}
                selectedId={option}
                containerStyle={{
                    alignItems: 'start'
                }}
            />
    )
}

export default memo(DropOffOptions);