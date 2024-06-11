import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
    Container,
    Order,
    Details,
    Title,
    Button,
    ButtonText
} from './styles.js';
import images from '~/Common/images';
import firestore from '@react-native-firebase/firestore';
import { formatDeliveryTime } from '~/Common/functions';

function DisplayOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const collectionRef = firestore().collection('allOrders');
        collectionRef.onSnapshot((snapshot) => {
            const currentOrders = [];            
            snapshot.forEach((doc) => {
                currentOrders.push({...doc.data(), id: doc.id});
            })
            setOrders(currentOrders);            
        })
    }, [])

    return(
        <ScrollView>
            <Container source={images['background']}>
                {
                    orders.map((order) => {
                        const id = order.id;
                        const restaurantName = order.restaurantName;
                        const items = order.cart.reduce((acc, item) => {
                            return acc + item.quantity;
                        }, 0);
                        const dropOffOption = order.dropOffOption;
                        const deliveryTime = `${formatDeliveryTime(order.deliveryTime)} - ${formatDeliveryTime(Number(order.deliveryTime) + 30)}`;
                        const dropOffInstructions = order.dropOffInstructions

                        return (      
                            <Order key={id}>
                                <Details>
                                    <Title>Order from: </Title> {restaurantName}
                                </Details>
                                <Details>
                                    <Title>Pick up by: </Title> {`${deliveryTime}`}
                                </Details>
                                <Details>
                                    <Title># items: </Title> {items}
                                </Details>
                                <Details>
                                    <Title>Drop off option:</Title> {dropOffOption}
                                </Details>
                                {dropOffInstructions && 
                                    <Details>
                                        <Title>Instructions:</Title> {dropOffInstructions}
                                    </Details>
                                }
                                <Button>
                                    <ButtonText>
                                        Pick up Order
                                    </ButtonText>
                                </Button>
                            </Order>
                        )
                    }) 
                }
            </Container>              
        </ScrollView>        
    )
}

export default DisplayOrders;