import React, {useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {
    Submit, 
    ButtonText,
} from './styles.js';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
 
function SubmitOrder() {
    const [loading, setLoading] = useState(false);
    const cart = useSelector(state => state.cart.items);
    const restaurantName = useSelector(state => state.cart.restaurant);
    const {number, cvc, zip, expiration} = useSelector(state => state.checkout.creditCard);
    const {option, deliveryTime, schedule} = useSelector(state => state.checkout.deliveryOption);
    const dropOffOption = useSelector(state => state.checkout.dropOffOption);
    const dropOffInstructions = useSelector(state => state.checkout.dropOffInstructions);
    const total = useSelector(state => state.checkout.total);
    const {user, restaurant} = useSelector(state => state.location);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if(!number){
            Alert.alert('Enter card number');
            return;
        }
        else if(!cvc){
            Alert.alert('Enter CVC');
            return;
        }
        else if(!zip){
            Alert.alert('Enter ZIP');
            return;
        }
        else if(!expiration){
            Alert.alert('Enter expiration date');
            return;
        }
        setLoading(true);
        try{
            let order = {
                cart,
                deliveryOption: option,
                dropOffOption,
                dropOffInstructions,
                deliveryTime,
                restaurantName: restaurantName,
                schedule,
                total: option === 'Express' ? total + 5 : total,
                customerLocation: user,
                restaurantLocation: restaurant,
            }
            const docRef = firestore().collection('allOrders').doc();
            await docRef.set(order);
            dispatch({type: 'CLEAR'});                          //clearing up the global state
            navigation.navigate('home');
            Alert.alert('Order has been placed');            
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <Submit onPress={handleSubmit}> 
            {loading ? <ActivityIndicator color='white' size='medium'/> : <ButtonText>
                Place Order
            </ButtonText>}
        </Submit>
    )
}

export default SubmitOrder;