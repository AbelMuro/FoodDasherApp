import React, {useRef, useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import SelectRestaurant from './SelectRestaurant';
import EnterAddress from './EnterAddress';
import {Image} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import {
    SearchBox, 
    FieldSet, 
    SearchButton,
    ButtonText
} from './styles.js';
import icons from './icons';


function Map() {
    const [usersLocation, setUsersLocation] = useState(null);
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

    const handleSearch = async () => {
        if(!restaurant.current.state)
            return;
        if(!address.current.state)
            return;
        setLoading(true);

        let latlong = await geocode(address.current.state);
        setUsersLocation(latlong);
    }

    const geocode = async (address) => {
        try{
            let response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${process.env.geocode}`);
            let results = await response.json();
            let latlong = results[0];
            return {lat: Number(latlong.lat) , lon: Number(latlong.lon)};            
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(!usersLocation) return;

        map.current.animateToRegion({
            latitude: usersLocation.lat,
            longitude: usersLocation.lon,
        })
        setLoading(false);
        
    }, [usersLocation])


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
                            longitude: usersLocation.lon,
                        }}> 
                        <Image 
                            source={icons['green']} 
                            style={{width: 35, height: 35}}
                            resizeMode='contain'/>
                    </Marker>
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
        </>
    )
}

export default Map;