import React, {useState, useRef} from 'react';
import {
    Fieldset,
    CardDetail,
    ErrorMessage,
    Label
} from './styles.js'

function ExpirationDate(){
    const [expiration, setExpiration] = useState('');
    const [error, setError] = useState(false);
    const inputRef = useRef();

    const handleExpiration = (text) => {
        inputRef.current.setNativeProps({ selection: { start: text.length, end: text.length } });
        setError(false);
        let cleanedText = text.replace('/', '');

        if(cleanedText.match(/\D/g))
            return;

        let formattedText = cleanedText;
        if(cleanedText.length > 2)
            formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, cleanedText.length)}`;
        setExpiration(formattedText);
    }   

    const handleBlur = () => {
        if(!expiration.length){
            setError('empty');
            return;
        }
        else if(expiration.length < 5){
            setError('invalid date');
            return;
        }
       
       let month = Number(expiration.slice(0, 2));
       let year = Number(expiration.slice(3, 5)); 
       let currentDate = new Date();
       let currentMonth = currentDate.getMonth() + 1;
       let currentYear = currentDate.getFullYear() % 100;

       if(!month || !year)
            setError('invalid date');
       else if(year < currentYear || (year === currentYear && month < currentMonth))
            setError('invalid date');
    }

    return(
        <Fieldset>
            <Label>
                Expiration
            </Label>
            <CardDetail 
                ref={inputRef}
                style={error && {
                    borderColor: 'red',
                    color: 'red',
                }}
                value={expiration}
                onChangeText={handleExpiration}
                onBlur={handleBlur}
                placeholder='MM/YY'
                placeholderTextColor={error === 'empty' ? 'red' : 'grey'}
                keyboardType='numeric'
                maxLength={5}
            />   
                {error === 'empty' && 
                    <ErrorMessage>
                        can't be empty
                    </ErrorMessage>
                }                 
                {error === 'invalid date' &&
                    <ErrorMessage>
                        invalid date
                    </ErrorMessage>
                }
        </Fieldset>
    )
}

export default ExpirationDate;