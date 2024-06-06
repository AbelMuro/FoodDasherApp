import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

function IsLoggedIn() {
    const dispatch = useDispatch();

    const onAuthStateChanged = (user) => {
        if(!user)
            dispatch({type: 'UPDATE_LOGGIN', loggedIn: false})
        else
            dispatch({type: 'UPDATE_LOGGIN', loggedIn: true});

        console.log(user);
    }

    /*useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])*/

    return(<></>)
}

export default IsLoggedIn;