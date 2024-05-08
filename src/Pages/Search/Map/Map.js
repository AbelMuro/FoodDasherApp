import React from 'react';
import {Image} from 'react-native'
import MapView from 'react-native-maps';
import {
    SearchBox, 
    FieldSet, 
    EnterAddress,
    SearchButton,
    ButtonText
} from './styles.js';
import icons from './icons';

function Map() {

    const mapStyles = {
        width: '90%',
        height: 500,
        borderRadius: 10,
        marginBottom: 20
    }

    return(
        <>
            <MapView
                style={mapStyles}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />        
            <SearchBox> 
                <FieldSet> 
                    <Image source={icons['green']} style={{width: 15, height: 25}}/>
                    <EnterAddress placeholder='Enter Address'/>    
                </FieldSet>
                <FieldSet> 
                    <Image source={icons['blue']} style={{width: 15, height: 25}}/>
                    <EnterAddress placeholder='Enter Address'/>    
                </FieldSet>
                <SearchButton>
                    <ButtonText>
                        Search Restaurants
                    </ButtonText>
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