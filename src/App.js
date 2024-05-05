import React, {useEffect} from 'react';
import { SafeAreaView, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function App() {

    useEffect(() => {
        async function FS() {
            await firestore().collection(`my collection`).doc('userInfo').set({}); 
        }

        FS();
    }, [])


    return (
        <SafeAreaView>
            <Text>
                Hello World
            </Text>
        </SafeAreaView>
    );
}

export default App;
