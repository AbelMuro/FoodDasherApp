import React, {useState, useEffect, useRef} from 'react';
import { ActivityIndicator, ScrollView, Button, Alert } from 'react-native';
import EmailInput from './EmailInput';
import PhoneInput from './PhoneInput';
import ZipInput from './ZipInput';
import images from '~/Common/images';
import {
    Container,
    FormContainer,
    Title,
    Submit,
    ButtonText
} from './styles.js'
import { Formik, Field } from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Dialog from 'react-native-dialog';

function Register() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState(null);
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const countryCode = useRef('');
    const userInfoRef = useRef({});

    const handleCode = (text) => {
        setCode(text);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleCodeSubmit = async () => {
        try{
            const email = userInfoRef.current.email;
            const phone = userInfoRef.current.phone;
            const zip = userInfoRef.current.zip;
            const ccode = countryCode.current;                      //country code

            setOpen(false);            
            setLoading(true);
            await confirm.confirm(code);                            //code submitted by the user
            const docRef = firestore().collection(`${ccode + phone}`).doc('userInfo');
            await docRef.set({
                email,
                zip,
                phone: ccode + phone,
                image: ''
            });          
            navigation.navigate('account-login');        
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

    const handleSubmit = async (values) => {
        setLoading(true);
        userInfoRef.current = {
            email: values.email,
            phone: values.phone.replaceAll('-',''),
            zip: values.zip,
        }
        const phone = values.phone.replaceAll('-','');
        const code = countryCode.current;

        try{
            const docRef = firestore().collection(`${code + phone}`).doc('userInfo');
            const doc = await docRef.get();
            if(doc.exists)
                throw new Error('auth/phone-number-already-registered')
            const confirmation = await auth().signInWithPhoneNumber(code + phone);     
            setConfirm(confirmation)
        } 
        catch(error){
            if(error.code === 'auth/invalid-phone-number')
                Alert.alert('Phone number is invalid')
            else if(error.code === 'auth/too-many-requests')
                Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later');
            else if(error.message === 'auth/phone-number-already-registered')
                Alert.alert('Phone number is already registered');
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const getCountryCode = (code) => {
        countryCode.current = code;
    }

    const validateForm = (values) => {
        const errors = {};

        if(!values.email)
            errors.email = 'empty';
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
            errors.email = 'invalid';
        if(!values.phone)
            errors.phone = 'empty';
        else if(!values.phone.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/) && !values.phone.match(/[0-9]{10}/))
            errors.phone = 'invalid';
        else if(values.phone.length > 10)
            errors.phone = 'invalid';
        if(!values.zip)
            errors.zip = 'empty';
        else if(!/[0-9]{5}/i.test(values.zip))
            errors.zip = 'invalid';

        return errors;
    }

    useEffect(() => {
        if(confirm)
            setOpen(true);
    }, [confirm])

    return(
        <ScrollView>
            <Container source={images['background']}>
                <FormContainer>
                    {confirm ? 
                        <Title>
                            Verify Phone Number
                        </Title> :
                        <Title>
                            Become a Food Dasher today!
                        </Title>}                
                    {!confirm ? 
                    <Formik
                        initialValues={{email: '', phone: '', zip: ''}}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                        validate={validateForm}
                    >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <>
                            <Field
                                name='email'
                                type='email'
                                > 
                                    {() => (
                                        <EmailInput
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                            </Field>         
                            <Field
                                name='phone'
                                type='phone'> 
                                    {() => (
                                        <PhoneInput
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.phone}
                                            errors={errors}
                                            touched={touched}
                                            getCountryCode={getCountryCode}
                                        />
                                    )}
                            </Field>       
                            <Field
                                name='zip'
                                type='zip'> 
                                    {() => (
                                        <ZipInput
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                            </Field>  
                            <Submit onPress={handleSubmit}>
                                {loading ? <ActivityIndicator color='green' size='small'/> : 
                                    <ButtonText>
                                    Register
                                </ButtonText>}
                            </Submit>
                        </>
                    )}
                    </Formik> : 
                    <Submit onPress={handleOpen}>
                        {loading ? <ActivityIndicator color='green' size='small'/> : <ButtonText>
                            Enter Code
                        </ButtonText>}
                    </Submit>
                }
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
        </ScrollView>
    )
}

export default Register;