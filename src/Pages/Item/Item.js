import React, {useEffect, useState} from 'react';
import Price from './Price';
import {Image, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ingredient from './Ingredient';
import images from '~/Common/images';
import {
    Container,
    ItemTitle,
    ItemIngredients,
    Message
} from './styles.js';

function Item({route, navigation}) {
    const {name, item} = route.params;
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        async function getItem(){
            const menuItem = await firestore().collection(name).doc(item).get();
            setItemData(menuItem.data());
        }
        getItem();
    }, [name])

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
                                itemData.ingredients.map((ingredient) => {
                                    return(
                                        <Ingredient key={ingredient} label={ingredient}/>
                                    )
                                })
                            }
                        </ItemIngredients>       
                        <Price price={itemData.price}/>
                    </>           
                } 
            </Container>
        </ScrollView>

    )
}

export default Item;