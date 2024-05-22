import React, {useState, useEffect} from 'react';
import {Image, ScrollView} from 'react-native';
import images from '~/Common/images';
import {useSelector} from 'react-redux';
import {
    Container,
	Message    
} from './styles.js';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import icons from '~/Common/icons';
import {mapStyle} from './MapStyle';
import Form from './Form';

function Checkout() {
    const location = useSelector(state => state.location.user);    
    const destination = useSelector(state => state.location.restaurant);
	const [travelTime, setTravelTime] = useState(0);
    const [region, setRegion] = useState({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.1422,
	    longitudeDelta: 0.0421,
    })

	const handleDirectionsReady = (result) => {
		const time = result.duration.toFixed(2);

		const minutes = time.slice(0, time.indexOf('.'));
		const seconds = time.slice(time.indexOf('.') + 1, time.length);
		setTravelTime(`${minutes} minutes, ${seconds} seconds`);
	}

    return(
		<ScrollView>
			<Container source={images['background']}>
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
					Delivery Time: {travelTime}
				</Message>
				<Form/>
			</Container>			
		</ScrollView>

    )
}

export default Checkout;