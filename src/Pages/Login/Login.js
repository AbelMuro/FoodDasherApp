import React, {useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function Login() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        console.log(values);
    }

    const validateForm = (values) => {
        const errors = {};

        if(!values.phone)
            errors.phone = 'empty';
    
        return errors;
    }

    useEffect(() => {
        if(isLoggedIn)
            navigation.navigate('account');
    }, [isLoggedIn])

    return(
        <Container source={images['background']}>
            <FormContainer>
                <Title>
                    Food Dasher Login
                </Title>
                <Formik
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
                                            />
                                        )}
                                </Field>
                                <Submit onPress={handleSubmit}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </Submit>
                            </>
                        )
                    }
                </Formik>
            </FormContainer>
        </Container>
    )
}

export default Login;