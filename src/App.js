import React, {useEffect} from 'react';
import {Text} from 'react-native';
import Home from './Pages/Home';
import Search from './Pages/Search';
import NavigationBar from './Components/NavigationBar';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <NavigationBar/>     
            <Stack.Navigator initialRouteName='home'>     
                <Stack.Screen name='home' component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name='search' component={Search} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
