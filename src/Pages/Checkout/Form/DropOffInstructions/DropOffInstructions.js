import React from 'react';
import {TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

function DropOffInstructions() {
    const option = useSelector(state => state.checkout.dropOffInstructions);
    const dispatch = useDispatch();

    const handleChange = (text) => {
        dispatch({type: 'UPDATE_DROPOFF_INSTRUCTIONS', text});
    }

    return(
        <TextInput
            placeholder='Enter instructions'
            value={option}
            onChangeText={handleChange}
            style={{
                width: '100%',
                height: 200,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'green',
                padding: 10,
                borderRadius: 10,
                textAlignVertical: 'top'
            }}
            multiline={true}
        />
    )

}

export default DropOffInstructions;