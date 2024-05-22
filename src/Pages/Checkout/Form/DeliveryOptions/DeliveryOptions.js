import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Dropdown } from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';
import {
    Title,
    DropdownContainer
} from './styles.js';


//i need to double check the use effect, i need to get the correct future dates
function DeliveryOptions({handleOption}) {
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('Standard');          
    const [schedule, setSchedule] = useState('');
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
            let futureHoursOne = futureDateOne.getHours();
            let futureHoursTwo = futureDateTwo.getHours();
            futureHoursOne = futureHoursOne > 12 ? (futureHoursOne - 12) : futureHoursOne;
            futureHoursTwo = futureHoursTwo > 12 ? (futureHoursTwo - 12) : futureHoursTwo;
            let futureMinutesOne = futureDateOne.getMinutes();
            let futureMinutesTwo = futureDateTwo.getMinutes();
            let AmPmOne = futureMinutesOne > 12 ? 'pm' : 'am';
            let AmPmTwo = futureMinutesTwo > 12 ? 'pm' : 'am';
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
                        data={data.current}
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