import React, {useState} from 'react';
import {Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import icons from '~/Common/icons';
import {mapStyle} from './MapStyle';
import {useSelector} from 'react-redux';
import {
	Message    
} from './styles.js';

function Map() {
    const location = useSelector(state => state.location.user);    
    const destination = useSelector(state => state.location.restaurant);
	const deliveryOption = useSelector(state => state.checkout.deliveryOption);
	const deliveryTime = useSelector(state => state.checkout.deliveryTime);
	const [travelTime, setTravelTime] = useState('');
    const [region, setRegion] = useState({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.1422,
	    longitudeDelta: 0.0421,
    })

	const handleDirectionsReady = (result) => {
		const time = result.duration.toFixed(2);
		const minutes = Number(time.slice(0, time.indexOf('.')));
		const seconds = Number(time.slice(time.indexOf('.') + 1, time.length));
		setTravelTime([minutes, seconds]);
	}

	const handleExpress = () => {
		if(deliveryOption === 'Express')
			return travelTime[0] < 5 ? 0 : travelTime[0] - 5;
		else
			return travelTime[0];
	}

    return(
        <>
            <MapView
                customMapStyle={mapStyle}
                style={{
                    width: '90%',
                    borderRadius: '20px',
                    height: 300,
                    margin: 'auto'
                }}
                region={region}
            > 
                <Marker			
                    coordinate={{
                        latitude: location.lat,
                        longitude: location.lng}}> 
                    <Image 				
                        source={icons['green']} 
                        style={{width: 35, height: 35}}
                        resizeMode='contain'/>
                </Marker>
                <Marker			
                    coordinate={{
                        latitude: destination.lat,
                        longitude: destination.lng}}> 
                    <Image 				
                        source={icons['blue']} 
                        style={{width: 35, height: 35}}
                        resizeMode='contain'/>
                </Marker>
                <MapViewDirections	
                        onReady={handleDirectionsReady}
                        origin={{
                            latitude: location.lat,
                            longitude: location.lng,
                        }}
                        destination={{
                            latitude: destination.lat,
                            longitude: destination.lng
                        }}
                        apikey={process.env.googlemaps}
                        strokeWidth={3}
                        strokeColor='green'
                />	
            </MapView>       
            <Message>
				Delivery Time: {(deliveryTime && deliveryOption === 'Schedule') ? deliveryTime : `${handleExpress()} minutes, ${travelTime[1]} seconds`}
			</Message> 
        </>

    )
}

export default Map;