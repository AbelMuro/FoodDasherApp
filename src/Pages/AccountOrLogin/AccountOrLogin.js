import React, {useState, useEffect} from 'react';
import Login from './Login';
import Account from './Account';
import auth from '@react-native-firebase/auth';

function AccountOrLogin() {
    const [page, setPage] = useState('login');

    const onAuthStateChanged = (user) => {
        if(!user)
            setPage('login')
        else
            setPage('account')

        console.log(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])

    return page === 'login' ? <Login setPage={setPage}/> : <Account setPage={setPage}/>
}

export default AccountOrLogin