import React from 'react';
import Map from './Map';
import {ScrollView} from 'react-native';
import images from '~/Common/images';
import {
    Container  
} from './styles.js';
import Form from './Form';

function Checkout() {	

    return(
		<ScrollView>
			<Container source={images['background']}>
				<Map/>
				<Form/>
			</Container>			
		</ScrollView>

    )
}

export default Checkout;