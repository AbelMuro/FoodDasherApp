import React, {useState, useEffect, useRef} from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import PhoneInput from './PhoneInput';
import {
    Container,
    FormContainer,
    Title,
    Submit,
    ButtonText,
} from './styles.js';
import images from '~/Common/images';
import { Formik, Field } from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Dialog from 'react-native-dialog';

function Login({setPage}) {
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [open, setOpen] = useState(false);
    const countryCode = useRef();

    const handleOpen = () => {
        setOpen(!open);
    }

    const getCountryCode = (code) => {
        countryCode.current = code;
    }

    const handleCode = (text) => {
        setCode(text);
    }

    const handleCodeSubmit = async () => {
        setOpen(false);          
        try{ 
            setLoading(true);
            await confirm.confirm(code);   
            setPage('account');                                    
        }
        catch(error){
            if(error.code === 'auth/invalid-verification-code')
                Alert.alert('Invalid code');
            else if(error.code === 'auth/unknown')
                Alert.alert("Can't be empty")
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleSubmit = async (values) => {
       const phoneNumber = values.phone.replaceAll('-', '');
       const ccode = countryCode.current;

       setLoading(true);
       try{
            const docRef = firestore().collection(ccode + phoneNumber).doc('userInfo');
            const doc = await docRef.get();
            if(!doc.exists)
                throw new Error('auth/phone-number-not-registered')
            const confirmation = await auth().signInWithPhoneNumber(ccode + phoneNumber);
            setConfirm(confirmation);
       }
       catch(error){
            if(error.code === 'auth/invalid-phone-number')
                Alert.alert('Phone number is invalid')
            else if(error.code === 'auth/too-many-requests')
                Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later');
            else if(error.message === 'auth/phone-number-not-registered')
                Alert.alert('Phone number is not registered');
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }


    const validateForm = (values) => {
        const errors = {};

        if(!values.phone)
            errors.phone = 'empty';
        else if(!values.phone.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/) && !values.phone.match(/[0-9]{10}/))
            errors.phone = 'invalid';
        else if(!values.phone.length > 10)
            errors.phone = 'invalid';
            
        return errors;
    }

    useEffect(() => {
        if(confirm)
            setOpen(true);

    }, [confirm])


    return(
        <>
            <Container source={images['background']}>
                <FormContainer>
                    <Title>
                        {confirm ? 'Verify Phone Number' : 'Food Dasher Login'}
                    </Title>
                    {!confirm ? <Formik
                        initialValues={{phone: ''}}
                        onSubmit={handleSubmit}
                        validate={validateForm}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                                <>
                                    <Field
                                        name='phone'
                                        type='phone'>
                                            {() => (
                                                <PhoneInput
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errors={errors.phone}
                                                    touched={touched}
                                                    getCountryCode={getCountryCode}
                                                />
                                            )}
                                    </Field>
                                    <Submit onPress={handleSubmit}>
                                        {loading ? <ActivityIndicator color='green' size='small'/> : 
                                            <ButtonText>
                                                Login
                                            </ButtonText>}
                                    </Submit>
                                </>
                            )
                        }
                    </Formik> : 
                        <Submit onPress={handleOpen}>
                            {loading ? <ActivityIndicator color='green' size='small'/> : 
                                <ButtonText>
                                    Enter Code
                                </ButtonText>}
                        </Submit>}
                </FormContainer>
            </Container>    
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    We have sent a code to your phone, please enter the code
                </Dialog.Title>
                <Dialog.Input value={code} onChangeText={handleCode}/>
                <Dialog.Button label='Submit' onPress={handleCodeSubmit}/>
                <Dialog.Button label='Cancel' onPress={handleCancel}/>
            </Dialog.Container>    
        </>

    )
}

export default Login;