import React, {useState, useEffect} from 'react';
import {Text, Alert, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {onSnapshot} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
import {useSelector} from 'react-redux';


function Account() {
    const navigation = useNavigation();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [accountInfo, setAccountInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAccount = () => {

    }

    const handleImage = async () => {
        try{
            setLoading(true);
            const phoneNumber = auth().currentUser.phoneNumber;
            const image = await launchImageLibrary({
                mediaType: 'photo'
            })
            if(image.didCancel) return;
            const imageObject = image.assets[0];
            const imageRef = storage().ref(`${phoneNumber}/${imageObject.fileName}`);
            await imageRef.putFile(imageObject.uri);
            const url = await storage().ref(`${phoneNumber}/${imageObject.fileName}`).getDownloadURL();
            await firestore().collection(`${phoneNumber}`).doc('userInfo').update({
                image: url
            })
            Alert.alert('image has been uploaded');
            setLoading(false);

        } catch(error){
            if(error === 'camera_unavailable')
                Alert.alert('Camera is not available')
            else if(error === 'permission')
                Alert.alert("Please allow app to access images in permissions");
            }   
            setLoading(false);
        }

    const handleLogOut = async () => {
        await auth().signOut();
    }

    useEffect(() => {
        if(!isLoggedIn)
            navigation.navigate('login');

        let unsubscribe = null;
        async function getUserInfo() {
            const phoneNumber = auth().currentUser.phoneNumber;
            const docRef = firestore().collection(`${phoneNumber}`).doc('userInfo');
            unsubscribe = onSnapshot(docRef, (snapshot) => {
                setAccountInfo(snapshot.data())
            })
        }
        getUserInfo();

        return () => {
            unsubscribe && unsubscribe();
        }
    }, [isLoggedIn])



    return(
        <Container source={globalImages['background']}>
            <AccountContainer>
                <AccountImage source={accountInfo && accountInfo.image ? {uri: accountInfo.image} : localImages['emptyAvatar']}/>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>Email</Text>: {accountInfo && accountInfo.email}
                </AccountDetails>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>Phone:</Text> {accountInfo && accountInfo.phone}
                </AccountDetails>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>ZIP:</Text> {accountInfo && accountInfo.zip}
                </AccountDetails>
                <Button onPress={handleAccount}>
                    <ButtonText>
                        Update Account
                    </ButtonText>
                </Button>
                <Button onPress={handleImage}>
                    {loading ? <ActivityIndicator color='green' size='small'/> : <ButtonText>
                        Upload Image
                    </ButtonText>}
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