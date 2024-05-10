import React, {useRef, useState, useEffect} from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, Image, Text } from 'react-native';
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

//i will need to get the selectedRestaurant state and display the photo url in the dialog

function Map() {
    const [usersLocation, setUsersLocation] = useState(null);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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
        setSelectedRestaurant(restaurant);
    }

    const geocode = async (address) => {
        try{
            let response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${process.env.geocode}`);
            let results = await response.json();
            let latlong = results[0];
            return {lat: Number(latlong.lat), lng: Number(latlong.lon)};            
        }
        catch(error){
            console.log(error);
        }
    }

    const searchNearbyRestaurants = async () => {
        try{
            let response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${usersLocation.lat},${usersLocation.lng}&radius=5000&keyword=${restaurant.current.state}&key=${process.env.googlemaps}`);
            let results = await response.json();
            console.log(results);
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
            setNearbyRestaurants(restaurants); 
            map.current.animateToRegion({
                latitude: usersLocation.lat,
                longitude: usersLocation.lng,
            })
            setLoading(false);            
        }
        searchRestaurants();
    }, [usersLocation])

    useEffect(() => {
        if(!selectedRestaurant) return;
        setOpen(true);
    }, [selectedRestaurant])

    return(
        <>
            <MapView
                ref={map}
                style={mapStyles}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}> 
               {
                usersLocation && 
                    <Marker
                        coordinate={{
                            latitude: usersLocation.lat,
                            longitude: usersLocation.lng,
                        }}> 
                        <Image 
                            source={icons['green']} 
                            style={{width: 35, height: 35}}
                            resizeMode='contain'/>
                    </Marker>
               }
               {
                nearbyRestaurants && nearbyRestaurants.map((restaurant) => {
                    let latlong = restaurant.geometry.location;
                    let id = restaurant.place_id;
                    return(
                        <TouchableOpacity key={id} onPress={() => handleMarker(restaurant)}>
                            <Marker
                                coordinate={{
                                    latitude: latlong.lat,
                                    longitude: latlong.lng,
                                }}> 
                                <Image 
                                    source={icons['blue']} 
                                    style={{width: 35, height: 35}}
                                    resizeMode='contain'/>
                            </Marker>                            
                        </TouchableOpacity>
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
                        <ActivityIndicator size='medium' color={'white'}/> : 
                        <ButtonText>
                            Search Restaurants
                        </ButtonText>}
                </SearchButton>
                <SearchButton>
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
                            source={{uri: selectedRestaurant.photos[0].photo_reference}} 
                            style={{width: 100, height: 100}}
                            />
                        <Text>
                            {selectedRestaurant.rating}
                        </Text>
                    </DialogContent>
                    <Dialog.Button label='Select'/>
                    <Dialog.Button label='Close' onPress={handleClose}/>
                </Dialog.Container>  } 
        </>
    )
}

export default Map;