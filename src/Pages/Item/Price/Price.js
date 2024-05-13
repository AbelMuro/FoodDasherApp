import React, {useState, useEffect} from 'react';
import { SvgXml } from 'react-native-svg';
import icons from './icons';
import {
    Total,
    Quantity,
    Container,
    Decrement,
    Increment,
    ButtonContainer,
    AddButton,
    ButtonText,
    BackButton
} from './styles.js';
import { useNavigation } from '@react-navigation/native';

function Price({price}){
    const navigation = useNavigation();
    const [total, setTotal] = useState(price);
    const [quantity, setQuantity] = useState(1);

    const disableDecrement = () => {
        if(quantity === 1)
            return {backgroundColor: 'grey'};
    }

    const handleBack = () => {
        navigation.goBack();
    }

    const handleDecrement = () => {
        if(quantity === 1) return;
        setQuantity(quantity - 1);
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }


    useEffect(() => {
        setTotal(quantity * price);
    }, [quantity])


    return(
        <>
            <Total>
                ${total.toFixed(2)}
            </Total>        
            <Container>
                <Decrement onPress={handleDecrement} style={disableDecrement()}>
                    <SvgXml xml={icons['minus']} width='35px' height='15px'/>
                </Decrement>
                <Quantity>
                    {quantity}
                </Quantity>
                <Increment onPress={handleIncrement}>
                    <SvgXml xml={icons['plus']} width='35px' height='15px'/>
                </Increment>
            </Container>     
            <ButtonContainer>
                <AddButton>
                    <ButtonText>
                        Add to Order
                    </ButtonText>
                </AddButton>
                <BackButton onPress={handleBack}>
                    <ButtonText>
                        Go Back
                    </ButtonText>
                </BackButton>
            </ButtonContainer>     
        </>

    )
}

export default Price;