import React, {useState, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
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
import { useNavigation } from '@react-navigation/native';

function DisplayOrders() {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    const handleOrder = (order) => {
        navigation.navigate('pick-up-order', {order});
    }

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
                        const deliveryOption = order.deliveryOption;
                        const tip = order.tip;
                        let deliveryTime;
                        if(deliveryOption === 'Express')
                            deliveryTime = `${formatDeliveryTime(order.deliveryTime - 15)} - ${formatDeliveryTime((order.deliveryTime - 15) + 30)}`;
                        else if(deliveryOption === 'Schedule')                                   
                            deliveryTime = order.schedule;
                        else
                            deliveryTime = `${formatDeliveryTime(order.deliveryTime)} - ${formatDeliveryTime(order.deliveryTime + 30)}`
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
                                <Details>
                                    <Title>Tip:</Title> ${tip}
                                </Details>   
                                {deliveryOption === 'Express' && 
                                    <Details>
                                        Order placed with <Text style={{fontWeight: 700}}>Express</Text>
                                    </Details>
                                }
                                <Button onPress={() => handleOrder(order)}>
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