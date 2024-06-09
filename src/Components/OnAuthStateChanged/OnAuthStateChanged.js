import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation} from '@react-navigation/native';

function OnAuthStateChanged({navigate}) {
    const navigation = useNavigation();

    const onAuthStateChanged = (user) => {
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])

    return(<></>)
}

export default OnAuthStateChanged;