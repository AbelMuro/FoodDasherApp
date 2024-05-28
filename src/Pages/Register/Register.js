import React from 'react';
import EmailInput from './EmailInput';
import PhoneInput from './PhoneInput';
import ZipInput from './ZipInput';
import images from '~/Common/images';
import {
    Container,
    FormContainer,
    Title,
} from './styles.js'
import { Formik, Field } from 'formik';

function Register() {

    const handleSubmit = () => {
        
    }

    const validateForm = (values) => {

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
                    </>
                )}

                </Formik>
            </FormContainer>
        </Container>
    )
}

export default Register;