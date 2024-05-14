import React, {useState, useEffect, useRef} from 'react';
import {Image} from 'react-native';
import CheckBox from 'react-native-check-box';
import icons from './icons';

function Ingredient({label, handleIngredient}) {
    const [checked, setChecked] = useState(false);
    const skipFirstRender = useRef(true);

    const handleChecked = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        if(skipFirstRender.current) {
            skipFirstRender.current = false;
            return;
        }
        handleIngredient(checked)
    }, [checked])

    return(
        <CheckBox
            style={{height: 20}}
            onClick={handleChecked}
            isChecked={checked}
            rightText={`no ${label}`}
            rightTextStyle={{color: 'black'}}
            checkedImage={ <Image source={icons['checkmark']} style={{width: 20, height: 20}}/>}
            unCheckedImage={<Image source={icons['emptymark']} style={{width: 20, height: 20}}/>}
        />
    )
}

export default Ingredient;