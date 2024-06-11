import React from 'react';
import ImageCarousel from './ImageCarousel';
import {
    Header,
    Content,
    Logo,
    LogoText,
    Title,
    Container,
    TextBox,
    Description,
    Message,
    SignUpButton,
    ButtonText,
    CompanyDetails,
    CompanyTitle,
    CompanyDetail,
    Footer
} from './styles.js';
import images from '~/Common/images';
import { ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function Home() {
    const navigation = useNavigation();

    const handleSignUp = async () => {
        navigation.navigate('register');
    }

    return (
        <ScrollView>
            <Header source={images['background']} resizeMode='cover'>
                <Content>
                    <Logo>
                        <LogoText>
                            Food Dasher
                        </LogoText>
                    </Logo>
                    <Title>
                        The fastest delivery app in your area!
                    </Title>
                    <Container>
                        <TextBox>
                            <Text style={{color: 'black'}}>
                                #1 in Customer satisfaction
                            </Text>
                        </TextBox>
                        <Text style={{color: 'black'}}>
                            Always on time!
                        </Text>
                    </Container>
                    <Description>
                        Your delicious food is stored in a safe, 
                        temperature-controlled container until delivery. 
                        Food is guaranteed fresh or your money back!
                    </Description>
                    <Message>
                        Want to become a Food Dasher?{"\n"}
                        You can sign up with a click of a button!
                    </Message>
                    <SignUpButton onPress={handleSignUp}> 
                        <ButtonText>
                            Sign Up
                        </ButtonText>
                    </SignUpButton>                      
                </Content>
            </Header>
            <ImageCarousel/>
            <CompanyDetails source={images['background']} resizeMode='cover'>
                <CompanyTitle>
                    Our Restaurant Partners
                </CompanyTitle>
                <CompanyDetail>
                    At the moment, our app 
                    can only order from McDonalds and Jack in the box.
                    But we will soon have other restaurants available.
                </CompanyDetail>
                <CompanyTitle>
                    Contact Us
                </CompanyTitle>
                <CompanyDetail>
                    Questions or concerns? 
                    you can either call us at&nbsp;
                    <Text style={{fontWeight: 700}}>123-456-7898</Text> or email us &nbsp;
                    <Text style={{fontWeight: 700}}>someEmail@email.com</Text>
                </CompanyDetail>
                <CompanyTitle>
                    Open Hours
                </CompanyTitle>
                <CompanyDetail>
                    It depends on the restaurant. Most of the restaurants are open 24/7
                </CompanyDetail>
            </CompanyDetails>
            <Footer>
                <Text style={{color: 'white'}}>
                &copy; | Food Dasher App
                </Text>
            </Footer>
        </ScrollView>
    )
}

export default Home;