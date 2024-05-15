import React, {useEffect, useState, useRef} from 'react';
import Price from './Price';
import {Image, ScrollView, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ingredient from './Ingredient';
import images from '~/Common/images';
import {
    Container,
    ItemTitle,
    ItemIngredients,
    Message,
    ButtonContainer,
    AddButton,
    ButtonText,
    BackButton
} from './styles.js';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';

function Item({route, navigation}) {
    const ingredients = useRef([]);
    const quantity = useRef();
    const dispatch = useDispatch();
    const {name, item} = route.params;
    const [itemData, setItemData] = useState(null);

    const handleBack = () => {
        navigation.goBack();
    }

    const handleIngredients = (ingredient, checked, i) => {
        ingredients.current[i] = {ingredient, checked};
    }

    const handleQuantity = (newQuantity) => {
        quantity.current = newQuantity;
    }

    const handleItem = () => {
        let excludedIngredients = ingredients.current.filter((ingredient) => {
            return ingredient.checked;
        });
        excludedIngredients = excludedIngredients.map(ingredient => {
            return ingredient.ingredient
        })
        const totalQuantity = quantity.current;

        dispatch({type: 'ADD_ITEM', item: {
            id: uuid.v4(),
            name: itemData.name,
            image: itemData.image,
            quantity: totalQuantity,
            price: itemData.price,
            excludedIngredients: excludedIngredients,
        }});
        Alert.alert('item has been added to the cart');
        handleBack();
    }

    useEffect(() => {
        firestore().collection(name).doc(item).get()
            .then((menuItem) => {
                setItemData(menuItem.data()); 
            })
    }, [])

    return(
        <ScrollView>
            <Container source={images['background']}>
                {
                    itemData &&  
                    <>
                        <Image source={{uri: itemData.image}} style={{width: 300, height: 300}}/>
                        <ItemTitle>
                            {itemData.name}
                        </ItemTitle>  
                        <ItemIngredients>
                            <Message>
                                Select ingredients to exclude
                            </Message>
                            {
                                itemData.ingredients.map((ingredient, i) => {
                                    return(
                                        <Ingredient 
                                            key={ingredient} 
                                            label={ingredient} 
                                            handleIngredient={(checked) => handleIngredients(ingredient, checked, i)} />
                                    )
                                })
                            }
                        </ItemIngredients>       
                        <Price price={itemData.price} handleQuantity={handleQuantity}/>
                        <ButtonContainer>
                            <AddButton onPress={handleItem}>
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
                } 
            </Container>
        </ScrollView>

    )
}

export default Item;