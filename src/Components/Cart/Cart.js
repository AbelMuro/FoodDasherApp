import React, {useEffect, useRef} from 'react';
import {Text} from 'react-native';
import Quantity from './Quantity';
import {TouchableOpacity, Image} from 'react-native';
import Animated, {useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import icons from './icons';
import { SvgXml } from 'react-native-svg';
import {
    CartTitle,
    AllItems,
    Item,
    ItemDesc,
    EmptyMessage,
    CartTotal,
    GreenBox,
    CheckoutButton,
    ButtonText
} from './styles.js';
import { useNavigation } from '@react-navigation/native';

function Cart() {
    const navigation = useNavigation();
    const open = useSelector(state => state.open);
    const cart = useSelector(state => state.cart);     
    const total = useRef(0)
    const dispatch = useDispatch();
    const width = useSharedValue(0);

    const handleClose = () => {
        dispatch({type: 'CLOSE_CART'});
    }

    const handleCheckout = () => {
        navigation.navigate('checkout');
    }

    useEffect(() => {
        if(open){
            width.value = withTiming(300, {
                duration: 200,
                easing: Easing.linear,
            })
        }
        else{
            width.value = withTiming(0, {
                duration: 200,
                easing: Easing.linear
            })
        }
    }, [open])

    return(          
            <Animated.View 
                style={{
                    width,
                    height: '100%',
                    backgroundColor: 'darkgreen',
                    overflow: 'hidden',
                    borderLeftStyle: 'solid',
                    borderLeftColor: 'black',
                    borderLeftWidth: 2,
                    position: 'absolute',
                    zIndex: 100,
                    right: 0,
                    top: 0,
                }
            }> 
                <TouchableOpacity onPress={handleClose} style={{width: 100, height: 100}}>
                    <SvgXml 
                        xml={icons['close']} 
                        width='50px' 
                        height='50px' 
                        style={{position: 'absolute', left: 10, top: 20}}/>                
                </TouchableOpacity>
                <AllItems contentContainerStyle={{alignItems: 'center', gap: 60}}>
                    <CartTitle>
                        Your Cart:
                    </CartTitle>                     
                    {cart.length ? cart.map((item, i) => {
                        const name = item.name;
                        const id = item.id;
                        const image = item.image;
                        const excludedIngredients = item.excludedIngredients;
                        const sauces = item.sauces;
                        const price = item.price;
                        const quantity = item.quantity;
                        if(i === 0)
                            total.current = (price * quantity);
                        else
                            total.current += (price * quantity);

                        return(
                            <Item key={id}>
                                <Image source={{uri: image}} style={{width: 200, height: 200}}/>
                                <ItemDesc>
                                    <Text style={{fontWeight: 700}}>
                                        Name:&nbsp;
                                    </Text> 
                                    {name}
                                </ItemDesc>
                                <ItemDesc>
                                    {excludedIngredients.length !== 0 && <Text style={{fontWeight: 700}}>Exclude:&nbsp; </Text>}
                                    {excludedIngredients.length !== 0 && excludedIngredients.map((ingredient, i) => {
                                        if(i + 1 === excludedIngredients.length)
                                            return(`no ${ingredient}`)
                                        else
                                            return(`no ${ingredient}, `)
                                    })}
                                    {sauces.length !== 0 && <Text style={{fontWeight: 700}}>Sauces:&nbsp; </Text>}
                                    {sauces.length !== 0 && sauces.join(', ')}
                                </ItemDesc>
                                <Quantity 
                                    prevQuantity={quantity} 
                                    itemID={id}
                                    />
                                <ItemDesc>
                                    Price: ${(price * quantity).toFixed(2)}
                                </ItemDesc>
                            </Item>
                        )  
                    }) : <EmptyMessage>
                            Cart is Empty
                        </EmptyMessage>}    
                </AllItems>
                <GreenBox>
                    <CartTotal>
                        Total: ${total.current.toFixed(2)}
                    </CartTotal>    
                    <CheckoutButton onPress={handleCheckout}>
                        <ButtonText>
                            Check out
                        </ButtonText>
                    </CheckoutButton>                             
                </GreenBox>
            </Animated.View>           
    )
}

export default Cart;