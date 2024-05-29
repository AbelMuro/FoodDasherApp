import React from 'react';
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
import { useFormikContext } from 'formik';
import auth from '@react-native-firebase/auth';

function Register() {
    const formik = useFormikContext();

    const handleSubmit = async (values) => {
        const phoneNumber = values.phone;
        console.log(values);

        try{
            const isValid = await auth().verifyPhoneNumber('+1 510-619-6086');
            console.log(isValid);
            formik.handleBlur(e)            
        } 
        catch(error){
            console.log(error);
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
                            <ButtonText>
                                Register
                            </ButtonText>
                        </Submit>
                    </>
                )}

                </Formik>
            </FormContainer>
        </Container>
    )
}

export default Register;