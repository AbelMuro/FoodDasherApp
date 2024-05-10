import React from 'react';
import Home from './Pages/Home';
import Search from './Pages/Search';
import NavigationBar from './Components/NavigationBar';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

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
