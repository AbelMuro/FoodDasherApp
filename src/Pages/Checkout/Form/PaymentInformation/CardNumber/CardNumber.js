import React, {useState} from 'react';
import {
    Fieldset,
    CreditCard,
    CardIcon,
    ErrorMessage,
    Label,
} from './styles.js';
import icons from './icons';

function CardNumber(){
    const [number, setNumber] = useState('');
    const [error, setError] = useState(false);

    const handleNumber = (text) => {
        setError(false);
        const formatCard = text.replaceAll(' ', '');                         
        let temp = '';

        if(formatCard.match(/\D/g) || formatCard.length > 16)
            return;

        for(let i = 0; i < formatCard.length; i++){
            if(i % 4 === 0)                                      
                temp += ` ${formatCard[i]}`;
            else
                temp += formatCard[i];
        }
        setNumber(temp.replace(' ', ''));
    }

    const handleBlur = () => {
        if(!number.length)
            setError('empty');
        else if(number.length < 19)
            setError('invalid')
    }

    return(
        <Fieldset>
            <Label>
                Card Number
            </Label>
            <CreditCard 
                value={number}
                onChangeText={handleNumber}
                placeholder='xxxx xxxx xxxx xxxx'
                placeholderTextColor={error ? 'red' : 'grey'}
                keyboardType='numeric'
                onBlur={handleBlur}
                style={
                    error && {borderColor: 'red', color: 'red'}}
                />    
            <CardIcon source={icons['CreditCard']} />      
            {error === 'empty' && 
                <ErrorMessage>
                    can't be empty 
                </ErrorMessage>}   
            {error === 'invalid' && 
                <ErrorMessage>
                    invalid card
                </ErrorMessage>}   
        </Fieldset>
    )

}

export default CardNumber;