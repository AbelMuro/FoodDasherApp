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
import {launchImageLibrary} from 'react-native-image-picker';
import UpdateAccount from './UpdateAccount';
import DeleteAccount from './DeleteAccount';
import { useNavigation } from '@react-navigation/native';

function Account({setPage}) {
    const [accountInfo, setAccountInfo] = useState(null);
    const [loadingImage, setLoadingImage] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

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
        } catch(error){
            if(error === 'camera_unavailable')
                Alert.alert('Camera is not available')
            else if(error === 'permission')
                Alert.alert("Please allow app to access images in permissions");
        } finally { 
            setLoading(false);
        }
    }

    const handleOrders = () => {
        navigation.navigate('display-orders');
    }

    const handleLoadStart = () => {
        setLoadingImage(true);
    }

    const handleLoadEnd = () => {
        setLoadingImage(false);
    }

     const handleLogOut = async () => {
        await auth().signOut();
    }

    useEffect(() => {
        if(!auth().currentUser)
            return;
    
        const phoneNumber = auth().currentUser.phoneNumber;
        const docRef = firestore().collection(`${phoneNumber}`).doc('userInfo');
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAccountInfo(snapshot.data() || null)
        })
        return () => {
            unsubscribe && unsubscribe();
        }
    }, [])



    return(
        <Container source={globalImages['background']}>
            <AccountContainer>
                {loadingImage && <ActivityIndicator color='white' size='medium' style={{position: 'absolute', top: -35, left: '50%', zIndex: 1000} }/> }
                <AccountImage 
                    source={accountInfo && accountInfo.image ? {uri: accountInfo.image} : localImages['emptyAvatar']}
                    onLoadStart={handleLoadStart}
                    onLoad={handleLoadEnd}
                    />
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>Email</Text>: {accountInfo && accountInfo.email}
                </AccountDetails>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>Phone:</Text> {accountInfo && accountInfo.phone}
                </AccountDetails>
                <AccountDetails>
                    <Text style={{fontWeight: 700}}>ZIP:</Text> {accountInfo && accountInfo.zip}
                </AccountDetails>
                <Button onPress={handleOrders}>
                    <ButtonText>
                        Display All Orders
                    </ButtonText>
                </Button>                
                {accountInfo && <UpdateAccount phoneNumber={accountInfo.phone}/>}
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
                <DeleteAccount setPage={setPage}/>
            </AccountContainer>
        </Container>
    )
}

export default Account;