import React, {useState} from 'react';
import { ActivityIndicator } from 'react-native';
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

function Register() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const phoneNumber = values.phone;

        try{
            const isValid = await auth().signInWithPhoneNumber('5106196086');   //i need to fix this shit!!
            console.log(isValid);         
        } 
        catch(error){
            console.log(error);
        }
        finally{
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

    return(
        <Container source={images['background']}>
            <FormContainer>
                <Title>
                    Become a Food Dasher today!
                </Title>                
                <Formik
                    initialValues={{email: '', phone: '', zip: ''}}
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
                    </>
                )}

                </Formik>
            </FormContainer>
        </Container>
    )
}

export default Register;