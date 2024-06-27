import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const navigation = useNavigation();

    useEffect(() => {
        if(!cart.length){
            navigation.navigate('home');
            dispatch({type: 'CLEAR'});
        }
            
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
                            {(excluded.length !== 0 || sauces.length !== 0) && <ExcludedIngredients>
                                {excluded.map((ingredients, i) => {
                                    if(i < excluded.length - 1)
                                        return `no ${ingredients}, `
                                    else
                                        return `no ${ingredients}`    
                                    })
                                }    
                                {sauces.map((sauce, i) => {
                                    if(i < sauces.length - 1)
                                        return `${sauce}, `;
                                    else
                                        return `${sauce}`;                                      
                                    })
                                }                             
                            </ExcludedIngredients>}
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