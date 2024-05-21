import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Dropdown } from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';
import {
    Title,
    DropdownContainer
} from './styles.js';

function DeliveryOptions({handleOption}) {
    const [open, setOpen] = useState(false)
    const [option, setOption] = useState('Standard');          
    const [schedule, setSchedule] = useState('')

      const options = [
        {
            id: 'Standard',                             
            label: 'Standard',
            value: 'Standard',
            borderColor: 'green',            
            color: 'green',                 
            labelStyle: {color: 'black'}      
        },
        {
            id: 'Express',
            label: 'Express + $5',
            value: 'Express',
            borderColor: 'green',            
            color: 'green',                  
            labelStyle: {color: 'black'}      
        },
        {
            id: 'Schedule',
            label: 'Schedule',
            value: 'Schedule',
            borderColor: 'green',           
            color: 'green',                 
            labelStyle: {color: 'black'}     
        }
    ]

    const data = [
        {label: '8:30 pm - 9:00 pm', value: '8:30 pm - 9:00 pm'},
        {label: '9:00 pm - 9:30 pm', value: '9:00 pm - 9:30 pm'},
        {label: '10:00 pm - 10:30 pm', value: '10:00 pm - 10:30 pm'},
        {label: '11:00 pm - 11:30 pm', value: '11:00 pm - 11:30 pm'},
        {label: '12:00 pm - 12:30 pm', value: '12:00 pm - 12:30 pm'}
    ];

    const handleCancel = () => {
        setOpen(false);
    }

    useEffect(() => {
        if(option === 'Schedule')
            setOpen(true)
        else
            setOpen(false);
        handleOption(option)
    }, [option])

  
    return(
        <>
          <Title>
                Select Delivery Option
          </Title>
          <View style={{
            display: 'flex',
            alignSelf: 'start'
           }}>
            <RadioGroup 
                style={{
                    alignItems: 'start'
                }}
                radioButtons={options} 
                onPress={setOption}            
                selectedId={option}
                />                  
          </View>
          <Dialog.Container visible={open}>
                <Dialog.Title>
                    Schedule Order
                </Dialog.Title>
                <DropdownContainer>
                    <Dropdown 
                        style={{        
                            width: 220,
                            height: 50,
                            paddingHorizontal: 8,
                            position: 'absolute',
                            right: -5,
                            top: -5,                                     
                        }}        
                        placeholder='Select Time'                    
                        data={data}
                        labelField="label"
                        valueField="value"
                        iconStyle={{width: 20, height: 20}}    
                        value={schedule}
                        onChange={item => setSchedule(item)}               
                    />  
                </DropdownContainer>
                <Dialog.Button label='Select'/>
                <Dialog.Button label='Cancel' onPress={handleCancel}/>
          </Dialog.Container>
        </>
    )
}

export default DeliveryOptions;