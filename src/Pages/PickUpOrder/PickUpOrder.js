import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {
    Container,
    OrderDetails,
    Quantity,
    Detail,
    Item,
    ItemImage,
    ItemName
} from './styles.js';
import images from '~/Common/images';
import {formatDeliveryTime} from '~/Common/functions';
import MapView, {Marker} from 'react-native-maps';
import icons from '~/Common/icons';
import MapViewDirections from 'react-native-maps-directions';

function PickUpOrder({route}) {
    const {order} = route.params;
    const destination = {
        latitude: order.restaurantLocation.lat,
        longitude: order.restaurantLocation.lng,
    }
    const origin = {
        latitude: order.customerLocation.lat,
        longitude: order.customerLocation.lng,
    };
    const cart = order.cart;
    const deliveryTime = `${formatDeliveryTime(order.deliveryTime)} - ${formatDeliveryTime(Number(order.deliveryTime) + 30)}`
    const restaurantName = order.restaurantName;

    const mapStyles = {
        width: '100%',
        height: '50%',

    }

    return(
        <Container source={images['background']}>
            <MapView region={{...origin, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}} style={mapStyles}>
                {origin && 
                        <Marker
                            coordinate={{
                                latitude: origin.latitude,
                                longitude: origin.longitude,
                            }}> 
                            <Image 
                                source={icons['green']} 
                                style={{width: 45, height: 45}}
                                resizeMode='contain'/>
                        </Marker>
                }
                {destination && 
                        <Marker
                            coordinate={{
                                latitude: destination.latitude,
                                longitude: destination.longitude,
                            }}> 
                            <Image 
                                source={icons['blue']} 
                                style={{width: 45, height: 45}}
                                resizeMode='contain'/>
                        </Marker>
                }
                {
                    (origin && destination) && 
                        <MapViewDirections
                            origin={{
                                latitude: origin.latitude,
                                longitude: origin.longitude,
                            }}
                            destination={{
                                latitude: destination.latitude,
                                longitude: destination.longitude
                            }}
                            apikey={process.env.googlemaps}
                            strokeWidth={3}
                            strokeColor='green'
                            />
                }
            </MapView>
            <OrderDetails>
                <Detail>
                    Pick up from: {restaurantName}
                </Detail>
                <Detail>
                    Pick up by: {deliveryTime}
                </Detail>   
                {
                    cart.map((item) => {
                        const id = item.id;
                        const image = item.image;
                        const name = item.name
                        const quantity = item.quantity;

                        return(
                            <Item key={id}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                    <ItemImage source={{uri: image}}/>
                                    <ItemName>
                                        {name}
                                    </ItemName>                                    
                                </View>
                                <Quantity>
                                    x {quantity}
                                </Quantity>
                            </Item>
                        )
                    })
                }             
            </OrderDetails>
        </Container>
    )
}

export default PickUpOrder;