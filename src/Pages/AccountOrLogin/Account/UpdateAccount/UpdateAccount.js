import React, {useState, useEffect} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {
    Button, 
    ButtonText
} from './styles.js';
import Dialog from 'react-native-dialog';
import firestore from '@react-native-firebase/firestore';

function UpdateAccount({phoneNumber}){
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleEmail = (text) => {
        setEmail(text);
    }

    const handleZip = (text) => {
        setZip(text);
    }

    const handleSubmit = async () => {
        if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            Alert.alert('Invalid Email');
            return;
        }
        if(zip && !/[0-9]{5}/i.test(zip)){
            Alert.alert('Invalid Zip');
            return;
        }
        setOpen(false);
        try{
            setLoading(true);
            const docRef = firestore().collection(`${phoneNumber}`).doc('userInfo');
            await docRef.update({
                ...(email && {email}),
                ...(zip && {zip})
            })
            Alert.alert('Account has been updated')            
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!open){
            setEmail('');
            setZip('');
        }

    }, [open])


    return(
        <>
            <Button onPress={handleOpen}>
                {loading ? <ActivityIndicator color='green' size='small'/> : <ButtonText>
                    Update Account
                </ButtonText>}
            </Button>   
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    Update Account Info
                </Dialog.Title>
                <Dialog.Input value={email} onChangeText={handleEmail} placeholder='Enter New Email' style={{color: 'black'}}/>
                <Dialog.Input value={zip} onChangeText={handleZip} placeholder='Enter New ZIP' style={{color: 'black'}}/>
                <Dialog.Button label='Submit' onPress={handleSubmit} disabled={(!email && !zip)} style={(!email && !zip) && {color: 'grey'}}/>
                <Dialog.Button label='Cancel' onPress={handleOpen}/>
            </Dialog.Container>     
        </>

    )
}

export default UpdateAccount;