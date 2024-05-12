import React, {useState, useEffect} from 'react';
import {Image} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function Menu({route, navigation}) {
    const {name, restaurant} = route.params;
    const [menu, setMenu] = useState([]);
    const [logo, setLogo] = useState('');

    useEffect(() => {
        let menuRef = firestore().collection(`${name}`);
        let allMenuItems = []
        menuRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                let item = doc.data();                
                if(doc.id === 'logo')
                    setLogo(item.url)
                else
                    allMenuItems.push(item);
            })
            setMenu(allMenuItems);
        })
    }, [])

    useEffect(() => {
        console.log(menu)
    }, [menu])

    useEffect(() => {
        console.log(logo)
    }, [logo])


    return(
        <>
            {logo && <Image source={{uri: logo}} style={{width: 200, height: 200}}/>}
        </>
    )
}

export default Menu;