import React, {useState, useEffect, useRef} from 'react';
import {View, Alert, Text} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Dropdown } from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';
import {
    Title,
    DropdownContainer
} from './styles.js';
import {useSelector, useDispatch} from 'react-redux';

function DeliveryOptions() {
    const [open, setOpen] = useState(false);
    const option = useSelector(state => state.checkout.deliveryOption);  
    const schedule = useSelector(state => state.checkout.schedule);
    const dispatch = useDispatch();     
    const data = useRef([]);

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

    const handleSelect = () => {
        if(!schedule){
            Alert.alert('Please select a time')
            return;
        }
        dispatch({type: 'UPDATE_SCHEDULE', schedule});
        setOpen(false);
    }

    const handleCancel = () => {
        dispatch({type: 'UPDATE_DELIVERY_OPTION', option: 'Standard'})
        setOpen(false);
    }

    const handleSchedule = (schedule) => {
        dispatch({type: 'UPDATE_SCHEDULE', schedule: schedule.value});
    }

    const handleOption = (option) => {
        dispatch({type: 'UPDATE_DELIVERY_OPTION', option});
    }

    useEffect(() => {
        if(option === 'Schedule')
            setOpen(true)
        else
            setOpen(false);
    }, [option])

    useEffect(() => {
        const currentTime = new Date();
        const times = [];
        for(let i = 1; i <= 5; i++){
            let tempOne = new Date(currentTime.getTime() + (30 * i) * 60000);
            let tempTwo = new Date(currentTime.getTime() + (30 * (i + 1)) * 60000);
            times.push(`${tempOne}?${tempTwo}`);            
        }
        
        for(let i = 0; i < 5; i++){
            let dateOne = times[i].slice(0, times[i].indexOf('?'));
            let dateTwo = times[i].slice(times[i].indexOf('?') + 1, times[i].length);
            const futureDateOne = new Date(dateOne);
            const futureDateTwo = new Date(dateTwo);
            let tempOne = futureDateOne.getHours();
            let tempTwo = futureDateTwo.getHours();
            let futureHoursOne = (tempOne + 24) % 12 || 12;
            let futureHoursTwo = (tempTwo + 24) % 12 || 12;
            let AmPmOne = tempOne > 12 ? 'pm' : 'am';
            let AmPmTwo = tempTwo > 12 ? 'pm' : 'am';              
            let futureMinutesOne = futureDateOne.getMinutes();
            let futureMinutesTwo = futureDateTwo.getMinutes();
            times[i] = `${futureHoursOne}:${futureMinutesOne < 10 ? '0' + futureMinutesOne : futureMinutesOne}${AmPmOne} - ${futureHoursTwo}:${futureMinutesTwo < 10 ? '0' + futureMinutesTwo : futureMinutesTwo}${AmPmTwo}`;
        }
       times.forEach((time) => {
            data.current.push({
                label: time,
                value: time,
            });
       });
    }, [])

    return(
        <>
          <RadioGroup 
                containerStyle={{
                    alignItems: 'start'
                }}
                radioButtons={options} 
                onPress={handleOption}            
                selectedId={option}
            />             
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
                        data={data.current}
                        labelField="label"
                        valueField="value"
                        iconStyle={{width: 20, height: 20}}    
                        value={schedule}
                        onChange={handleSchedule}               
                    />  
                </DropdownContainer>
                <Dialog.Button label='Select' onPress={handleSelect}/>
                <Dialog.Button label='Cancel' onPress={handleCancel}/>
          </Dialog.Container>
        </>
    )
}

export default DeliveryOptions;