import React, {useState, useEffect} from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
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
import { useNavigation } from '@react-navigation/native';
import Dialog from 'react-native-dialog';

function Register() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState(null);
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');

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
            await confirm.confirm(code);               
            setOpen(false);
            navigation.navigate('account');        
        }
        catch(error){
            console.log(error);
        }
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        const email = values.email;
        const password = values.password;
        const phone = values.phone;
        const zip = values.zip;
        console.log(email);
        console.log(password);

        try{
            const credentials = await auth().createUserWithEmailAndPassword('abelmuro93@gmail.com', 'ajdwnaoiuwd72biuawd');  
            setLoading(false);
            navigation.navigate('account');
        } 
        catch(error){
            if(error.code === 'auth/email-already-in-use')
                setError('Email is already registered')
            else if(error.code === 'auth/invalid-email')
                setError('Invalid Email');
            console.log(error);
            setLoading(false);
        }
    }

    const validateForm = (values) => {
        const errors = {};

        if(!values.email)
            errors.email = 'empty';
        if(!values.phone)
            errors.phone = 'empty';
        if(!values.zip)
            errors.zip = 'empty'

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
                    <Title>
                        Become a Food Dasher today!
                    </Title>                
                    <Formik
                        initialValues={{email: '', password: '', phone: '', zip: ''}}
                        onSubmit={handleSubmit}
                        validate={validateForm}
                    >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <>
                            <Field
                                name='email'
                                type='email'> 
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
                                name='password'
                                type='password'
                                >
                                {() => (
                                        <PasswordInput
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.password}
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
                            {confirm && <Submit onPress={handleOpen}>
                                <ButtonText>
                                    Enter Code
                                </ButtonText>
                            </Submit>}
                        </>
                    )}
                    </Formik>
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