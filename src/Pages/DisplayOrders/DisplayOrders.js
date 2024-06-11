import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
    Container,
    Order,
    OrderDetails,
} from './styles.js';
import images from '~/Common/images';
import firestore from '@react-native-firebase/firestore';

function DisplayOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const collectionRef = firestore().collection('allOrders');
        collectionRef.onSnapshot((snapshot) => {
            const currentOrders = [];            
            snapshot.forEach((doc) => {
                currentOrders.push(doc.data());
            })
            setOrders(currentOrders);            
        })

    }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return(
            <Container source={images['background']}>
                {
                    orders.map((order) => {
                        const restaurantName = order.restaurantName;
                        const items = order.cart.length;
                        const dropOffOption = order.dropOffOption;
                        const deliveryTime = order.deliveryTime;

                        return (      
                            <Order>
                                <OrderDetails>
                                    Order from: {restaurantName}
                                </OrderDetails>
                                <OrderDetails>
                                    # items: {items}
                                </OrderDetails>
                                <OrderDetails>
                                    Drop off option: {dropOffOption}
                                </OrderDetails>
                            </Order>
                        )
                    }) 
                }
            </Container>            

    )
}

export default DisplayOrders;