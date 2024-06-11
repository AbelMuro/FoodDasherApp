import React, {useState, useMemo} from 'react';
import {Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import icons from '~/Common/icons';
import {mapStyle} from './MapStyle';
import {useSelector, useDispatch} from 'react-redux';
import {
	Message    
} from './styles.js';
import { current } from '@reduxjs/toolkit';

function Map() {
    const dispatch = useDispatch();
    const location = useSelector(state => state.location.user);    
    const destination = useSelector(state => state.location.restaurant);
	const {option, deliveryTime, schedule} = useSelector(state => state.checkout.deliveryOption);
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
        dispatch({type: 'UPDATE_DELIVERY_TIME', deliveryTime: [minutes, seconds]});
		setTravelTime([minutes, seconds]);
	}

    const currentTime = useMemo(() => {

		if(option === 'Express'){
            const minutes = travelTime[0] < 5 ? 0 : travelTime[0] - 5;
            const seconds = travelTime[1];
            return `${minutes} minutes, ${seconds} seconds`;
        }
        else if(option === 'Schedule')
            return schedule;
        else {
            const minutes = deliveryTime[0];
            const seconds = deliveryTime[1];
            return `${minutes} minutes, ${seconds} seconds`;
        }
            	
    }, [deliveryTime, option, schedule])

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
                {(location.lat !== 0 && location.lng !== 0) && <Marker			
                    coordinate={{
                        latitude: location.lat,
                        longitude: location.lng}}> 
                    <Image 				
                        source={icons['green']} 
                        style={{width: 35, height: 35}}
                        resizeMode='contain'/>
                </Marker>}
                {(destination.lat !== 0 && destination.lng !== 0) && <Marker			
                    coordinate={{
                        latitude: destination.lat,
                        longitude: destination.lng}}> 
                    <Image 				
                        source={icons['blue']} 
                        style={{width: 35, height: 35}}
                        resizeMode='contain'/>
                </Marker>}
                {(location.lat !== 0 && location.lng !== 0 && destination.lat !== 0 && destination.lng !== 0) && <MapViewDirections	
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
                />	}
            </MapView>       
            <Message>
				Delivery Time: {currentTime}
			</Message> 
        </>

    )
}

export default Map;