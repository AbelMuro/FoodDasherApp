import React, {useState} from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
    Button, 
    ButtonText
} from './styles.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Dialog from 'react-native-dialog';
import storage from '@react-native-firebase/storage';

function DeleteAccount({setPage}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const user = auth().currentUser;
        const phoneNumber = user.phoneNumber;
        const docRef = firestore().collection(`${phoneNumber}`).doc('userInfo');

        try{
            setLoading(true);
            await user.delete();            
            await docRef.delete();
            const filesRef = storage().ref(phoneNumber);
            const files = await filesRef.listAll();
            files.items.forEach((file) => {
                file.delete();
            })
            Alert.alert('Account has been deleted');
        }
        catch(error){
            if(error.code === 'auth/requires-recent-login'){
                Alert.alert('This operation is sensitive and requires recent authentication', 'Log in again before retrying this request.');
                setPage('login');
            }
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return(
        <>
            <Button onPress={handleOpen}>
                {loading ? <ActivityIndicator color='white' size='small'/> : <ButtonText>
                    Delete Account
                </ButtonText>}
            </Button>     
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    Are you sure you want to delete your account?
                </Dialog.Title>
                <Dialog.Description>
                    This action is irreversable
                </Dialog.Description>
                <Dialog.Button label='Delete' onPress={handleDelete}/>
                <Dialog.Button label='Cancel' onPress={handleCancel}/>
            </Dialog.Container>   
        </>
    )
}

export default DeleteAccount;