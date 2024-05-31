import React, {useEffect, useState} from 'react';
import {Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    Container,
    AccountContainer,
    AccountImage,
    AccountDetails,  
    Button,
    ButtonText  
} from './styles.js';
import globalImages from '~/Common/images';
import localImages from './images';
import { useNavigation } from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

function Account() {
    const navigation = useNavigation();
    const [userImage, setUserImage] = useState({});

    const handleAccount = () => {

    }

    const handleImage = async () => {
        try{
            const image = await launchImageLibrary({
                mediaType: 'photo'
            })
            setUserImage(image);

        } catch(error){
            if(error === 'camera_unavailable')
                Alert.alert('Camera is not available')
            else if(error === 'permission')
                Alert.alert("Please allow app to access images in permissions");
            }   
        }

    const handleLogOut = async () => {
        await auth().signOut();
    }

    const onAuthStateChanged = (user) => {
        if(!user)
            navigation.navigate('login');
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])

    return(
        <Container source={globalImages['background']}>
            <AccountContainer>
                <AccountImage source={localImages['emptyAvatar']}/>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>Email</Text>: abelmuro93@gmail.com
                </AccountDetails>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>Phone:</Text> 510 619 6086
                </AccountDetails>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>ZIP:</Text> 94806
                </AccountDetails>
                <Button onPress={handleAccount}>
                    <ButtonText>
                        Update Account
                    </ButtonText>
                </Button>
                <Button onPress={handleImage}>
                    <ButtonText>
                        Upload Image
                    </ButtonText>
                </Button>
                <Button onPress={handleLogOut}>
                    <ButtonText>
                        Log Out
                    </ButtonText>
                </Button>
            </AccountContainer>
        </Container>
    )
}

export default Account;