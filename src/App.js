import React from 'react';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Menu from './Pages/Menu';
import Item from './Pages/Item';
import Checkout from './Pages/Checkout';
import Register from './Pages/Register';
import NavigationBar from './Components/NavigationBar';
import Cart from './Components/Cart';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './Store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NavigationBar/>     
                <Stack.Navigator initialRouteName='home'>     
                    <Stack.Screen name='home' component={Home} options={{ headerShown: false }}/>
                    <Stack.Screen name='search' component={Search} options={{headerShown: false}}/>
                    <Stack.Screen name='menu' component={Menu} options={{headerShown: false}}/>
                    <Stack.Screen name='item' component={Item} options={{headerShown: false}}/>
                    <Stack.Screen name='checkout' component={Checkout} options={{headerShown: false}}/>
                    <Stack.Screen name='register' component={Register} options={{headerShown: false}}/>
                </Stack.Navigator>
                <Cart/>                             
            </NavigationContainer>         
        </Provider>
    );
}

export default App;
