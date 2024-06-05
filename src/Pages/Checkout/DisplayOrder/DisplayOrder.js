import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Quantity from './Quantity';
import {
    Container,
    ItemContainer,
    ItemImage,
    ItemDetails,
    ItemName,
    ExcludedIngredients,
    ItemPrice
} from './styles.js';
import { useNavigation } from '@react-navigation/native';

function DisplayOrder() {
    const cart = useSelector(state => state.cart.items);
    const navigation = useNavigation();

    useEffect(() => {
        if(!cart.length)
            navigation.navigate('home');
    }, [cart])

    return(
        <Container>
            {cart.map((item) => {
                const image = item.image;
                const id = item.id;
                const excluded = item.excludedIngredients;
                const name = item.name;
                const quantity = item.quantity;                
                const price = item.price * quantity;
                const sauces = item.sauces;

                return(
                    <ItemContainer key={id}>
                        <ItemImage source={{uri: image}}/>
                        <ItemDetails>
                            <ItemName>
                                {name}
                            </ItemName>
                            <ExcludedIngredients>
                                {excluded.map((ingredients, i) => {
                                    if(i < excluded.length - 1)
                                        return `no ${ingredients}, `
                                    else
                                        return `no ${ingredients}`    
                                    })
                                }                                
                            </ExcludedIngredients>
                            <ItemPrice>
                                {`$${price.toFixed(2)}`}
                            </ItemPrice>
                        </ItemDetails>  
                        <Quantity quantity={quantity} id={id}/>                                              
                    </ItemContainer>
                )
            })}
        </Container>
    )
}

export default DisplayOrder;