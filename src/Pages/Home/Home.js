import React from 'react';
import NavigationBar from '~/Components/NavigationBar';
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
    ButtonText
} from './styles.js';
import images from './images';
import { ScrollView, Text} from 'react-native';

function Home() {

    return (
        <ScrollView>
            <NavigationBar />
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
                    <SignUpButton> 
                        <ButtonText>
                            Sign Up
                        </ButtonText>
                    </SignUpButton>
                </Content>
            </Header>
            <ImageCarousel/>
        </ScrollView>
    )
}

export default Home;