import React, {useState, useEffect} from 'react';
import {Image} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {
    Container, 
    WorkHours, 
    DeliveryFee,
    Item,
    ItemImage,
    ItemName,
    ItemIngredients,
    ItemPrice,
    LogoContainer,
    SelectItem,
    ButtonText
} from './styles.js';

function Menu({route, navigation}) {
    const {name, restaurantLocation, usersLocation} = route.params;
    const [menu, setMenu] = useState([]);
    const [logo, setLogo] = useState('');

    const handleItem = (item) => {
        navigation.navigate('item', {name, item, restaurantLocation, usersLocation});
    }

    useEffect(() => {
        let menuRef = firestore().collection(`${name}`).orderBy('order');
        let allMenuItems = []
        menuRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                let item = doc.data();             
                if(doc.id === 'logo')
                    setLogo(item.url)
                else
                    allMenuItems.push(item);
            })
            setMenu(allMenuItems);
        })
    }, [])

    return(
        <Container 
            contentContainerStyle={{
                alignItems: 'center',
                gap: 25
            }}>
            {logo && 
                <LogoContainer>
                    <Image source={{uri: logo}} style={{width: '100%', height: 200}}/>
                    <WorkHours>
                        Work Hours: 24 Hours 
                    </WorkHours>
                    <DeliveryFee>
                        Delivery Fee $4.99
                    </DeliveryFee>                    
                </LogoContainer>
            }

            {menu && menu.map((item, i) => {
                const imageUrl = item.image;
                const name = item.name;
                const ingredients = item.ingredients; 
                const sauces = item.sauce;
                const price = item.price;
                let backgroundColor = i % 2 === 0 ? 'rgb(243, 236, 236)' : 'white';

                return(
                    <Item key={name} style={{backgroundColor}}>
                        <ItemImage source={{uri: imageUrl}}/>
                        <ItemName>
                            {name}
                        </ItemName>
                        <ItemIngredients>
                            {ingredients && ingredients.join(', ')}
                            {sauces && sauces.join(', ')}
                        </ItemIngredients>
                        <ItemPrice>
                            ${price.toFixed(2)}
                        </ItemPrice>
                        <SelectItem onPress={() => handleItem(name)}>
                            <ButtonText>
                                Choose Item
                            </ButtonText>
                        </SelectItem>
                    </Item>
                )
            })}
        </Container>
    )
}

export default Menu;