import React from 'react';
import Map from './Map';
import DisplayOrder from './DisplayOrder';
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
				<DisplayOrder/>
				<Form/>
			</Container>			
		</ScrollView>

    )
}

export default Checkout;