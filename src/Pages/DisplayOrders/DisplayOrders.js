import React, {useState, useEffect} from 'react';
import {Container} from './styles.js';
import images from '~/Common/images';
import firestore from '@react-native-firebase/firestore';

function DisplayOrders() {
    const [orders, setOrders] = useState([]);


    useEffect(() => {

        async function getOrders() {
            const collectionRef = firestore().collection('allOrders');
            collectionRef.onSnapshot((snapshot) => {
                setOrders(snapshot.data())
            })
        }
        getOrders();
    }, [])

    return(
        <Container source={images['background']}>
            {
                orders.length !== 0 && orders.map((order) => {
                    
                }) 
            }
        </Container>
    )
}

export default DisplayOrders;