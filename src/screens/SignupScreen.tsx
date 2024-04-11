import React, { useState } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native'
import globalStyles from '../styles/globalStyles'
import InputBox from '../components/InputBox'
import SubmitButton from '../components/SubmitButton'
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/slices/auth/userAuthSlice '
import { AppDispatch } from '../redux/store/store'

export default function SignupScreen({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();


    const handleSignUp = () => {
        dispatch(createUser({ email, username, password }));
        navigation.navigate('LoginScreen')
    };

    return (
        <KeyboardAvoidingView style={globalStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'> 
            
            <View style={styles.imageView}>
                <Image
                    source={require('../assets/logo.webp')}
                    style={styles.logoImage}
                />
                <Text style={styles.appName}>BlendIn</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.loginText}>Create an Account</Text>
            </View>
            <View style={styles.inputView}>
                <InputBox
                    placeholder="Email"
                    onChangeText={setEmail}
                    secureTextEntry={false}
                />
                <InputBox
                    placeholder="Username"
                    onChangeText={setUsername}
                    secureTextEntry={false}
                />
                <InputBox
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>

            <SubmitButton title="Create Account" onPress={handleSignUp} buttonStyle={{ minHeight: 30 }}/>
        
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    imageView: {
        flex: 0.35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 80,
        height: 80
    },
    appName: {
        color: 'black',
        fontSize: 25
    },
    textView: {
        flex: 0.05,
        margin: 10,
        marginHorizontal: 50,
    },
    loginText: {
        fontSize: 20,
        color: 'black',
    },
    inputView: {
        margin: 5,
        flex: 0.25,
    },
})
