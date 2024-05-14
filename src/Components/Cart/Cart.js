import React, {useEffect} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Animated, {useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import icons from './icons';
import { SvgXml } from 'react-native-svg';
import {
    CartTitle,
    AllItems,
    Item,
    ItemDesc
} from './styles.js';

//i will need to add another component that can increment and decrement the quantity of the item
function Cart() {
    const open = useSelector(state => state.open);
    const cart = useSelector(state => state.cart);          //i will need to traverse through this array and format the items
    const dispatch = useDispatch();
    const width = useSharedValue(0);

    const handleClose = () => {
        dispatch({type: 'CLOSE_CART'});
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

                <AllItems>
                    <CartTitle>
                        Your Cart:
                    </CartTitle>
                    {cart && cart.map((item) => {
                        const name = item.name;
                        const image = item.image;
                        const excludedIngredients = item.excludedIngredients;
                        const price = item.price;

                        return(
                            <Item key={name}>
                                <Image source={{uri: image}} style={{width: 200, height: 200}}/>
                                <ItemDesc>
                                    Name: {name}
                                </ItemDesc>
                                <ItemDesc>
                                    {excludedIngredients && 'Exclude: '}
                                    {excludedIngredients.map((ingredient, i) => {
                                        if(i + 1 === excludedIngredients.length)
                                            return(`no ${ingredient.ingredient}`)
                                        else
                                            return(`no ${ingredient.ingredient}, `)
                                    })}
                                </ItemDesc>
                                <ItemDesc>
                                    Price: ${price.toFixed(2)}
                                </ItemDesc>
                            </Item>
                        )  
                    })}                    
                </AllItems>

            </Animated.View>           
    )
}

export default Cart;