import React, {useRef, useState, useEffect} from 'react';
import { ActivityIndicator, Alert, Image, Text, Platform } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import SelectRestaurant from './SelectRestaurant';
import EnterAddress from './EnterAddress';
import Dialog from 'react-native-dialog';
import MapView, {Marker} from 'react-native-maps';
import {
    SearchBox, 
    FieldSet, 
    SearchButton,
    ButtonText,
    DialogContent
} from './styles.js';
import icons from './icons';
import { useNavigation } from '@react-navigation/native';

function Map({setScrollYPosition}) {
    const navigation = useNavigation();
    const [usersLocation, setUsersLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const restaurant = useRef();
    const address = useRef();
    const map = useRef();

    const mapStyles = {
        width: '90%',
        height: 500,
        borderRadius: 10,
        marginBottom: 20
    }

    const handleClear = () => {
        setDestination(null);
    }

    const handleSelect = () => {
        setOpen(false);
        navigation.navigate('menu', {
            name: restaurant.current.state.replaceAll('%20', ' '),
            restaurant: selectedRestaurant
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSearch = async () => {
        if(!restaurant.current.state){
            Alert.alert('Please select restaurant');
            return;
        }
        if(!address.current.state){
            Alert.alert('Please enter address');
            return;
        }
        setScrollYPosition(100);
        setLoading(true);
        const latlong = await geocode(address.current.state);
        if(!latlong) {
            Alert.alert('Address is invalid');
            setLoading(false);
            return;
        }
        setUsersLocation(latlong);
    }

    const handleMarker = (restaurant) => {
        setDestination(restaurant.geometry.location);
        setSelectedRestaurant(restaurant);
    }

    const geocode = async (address) => {
        try{
            let response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${process.env.geocode}`);
            let results = await response.json();
            let latlong = results[0];
            if(latlong)
                return {lat: Number(latlong.lat), lng: Number(latlong.lon)};            
            else    
                return null;
        }
        catch(error){
            console.log('error', error);
        }
    }

    const searchNearbyRestaurants = async () => {
        try{
            let response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${usersLocation.lat},${usersLocation.lng}&radius=5000&keyword=${restaurant.current.state}&key=${process.env.googlemaps}`);
            let results = await response.json();
            return results.results;         
        }
        catch(error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if(!usersLocation) return;

        async function searchRestaurants() {            
            let restaurants = await searchNearbyRestaurants();
            if(restaurants.length === 0){
                Alert.alert(`There are no nearby ${restaurant.current.state.replaceAll('%20', ' ')}`);
                setLoading(false);  
                return;
            }
            setRegion({
                latitude: usersLocation.lat,
                longitude: usersLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            setNearbyRestaurants(restaurants); 
            setLoading(false);                          
        }
        searchRestaurants();
    }, [usersLocation])

    useEffect(() => {
        if(!selectedRestaurant) return;
        console.log(selectedRestaurant);
        setOpen(true);
    }, [selectedRestaurant])

    useEffect(() => {
        if(open) return;
        setSelectedRestaurant(null);
    }, [open])

    return(
        <>
            <MapView
                ref={map}
                region={region}
                style={mapStyles}> 
                {
                    destination && <MapViewDirections
                        origin={{
                            latitude: usersLocation.lat,
                            longitude: usersLocation.lng,
                        }}
                        destination={{
                            latitude: destination.lat,
                            longitude: destination.lng
                        }}
                        apikey={process.env.googlemaps}
                        strokeWidth={3}
                        strokeColor='green'
                    />
                }
               {
                usersLocation && 
                    <Marker
                        coordinate={{
                            latitude: usersLocation.lat,
                            longitude: usersLocation.lng,
                        }}> 
                        <Image 
                            source={icons['green']} 
                            style={{width: 45, height: 45}}
                            resizeMode='contain'/>
                    </Marker>
               }
               {
                nearbyRestaurants && nearbyRestaurants.map((restaurant) => {
                    let latlong = restaurant.geometry.location;
                    let id = restaurant.place_id;
                    return(
                        <Marker
                            key={id}
                            onPress={() => handleMarker(restaurant)}
                            coordinate={{
                                latitude: latlong.lat,
                                longitude: latlong.lng,
                            }}> 
                             <Image 
                                source={icons['blue']} 
                                style={{width: 45, height: 45}}
                                resizeMode='contain'/>
                        </Marker>                            
                    )
                })
               }
            </MapView>        
            <SearchBox> 
                <FieldSet> 
                    <Image source={icons['green']} style={{width: 15, height: 25}}/> 
                    <EnterAddress ref={address}/>
                </FieldSet>
                <FieldSet> 
                    <Image source={icons['blue']} style={{width: 15, height: 25}}/>
                    <SelectRestaurant ref={restaurant}/>  
                </FieldSet>
                <SearchButton onPress={handleSearch}>
                    {loading ? 
                        <ActivityIndicator size={Platform.OS === 'ios' ? 'medium' : 'small'} color={'white'}/> : 
                        <ButtonText>
                            Search Restaurants
                        </ButtonText>}
                </SearchButton>
                <SearchButton onPress={handleClear}>
                    <ButtonText>
                        Clear Route
                    </ButtonText>
                </SearchButton>
            </SearchBox>     
            {selectedRestaurant && 
                <Dialog.Container visible={open}>
                    <Dialog.Title>
                        {selectedRestaurant.vicinity}
                    </Dialog.Title>
                    <DialogContent>
                        <Image 
                            source={{uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${selectedRestaurant.photos[0].photo_reference}&sensor=false&maxheight=1600&maxwidth=1600&key=${process.env.googlemaps}`}} 
                            style={{width: '100%', height: 100}}
                            />
                        <Text style={{fontWeight: 700}}>
                            Rating: {selectedRestaurant.rating}/5
                        </Text>
                    </DialogContent>
                    <Dialog.Button label='Select' onPress={handleSelect}/>
                    <Dialog.Button label='Close' onPress={handleClose}/>
                </Dialog.Container>  } 
        </>
    )
}

export default Map;