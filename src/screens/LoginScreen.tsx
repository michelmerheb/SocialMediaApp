import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import globalStyles from "../styles/globalStyles";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import SocialButton from "../components/SocialButton";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { login } from '../redux/slices/auth/userAuthSlice '; 

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.userAuth.error);

    
    const handleSignIn = async () => {
        if ((email || username) && password) {
          dispatch(login({ email, password, username: email }));
        }
      };
      
    const handleSignUpPress = () => {
      navigation.navigate('SignupScreen');
    };


    return (
        <KeyboardAvoidingView style={globalStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
           <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'> 
            <View style={styles.imageView}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.appName}>BlendIn</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.loginText}>Login to your Account</Text>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.inputView}>
                <InputBox
                    placeholder="Email or Username"
                    onChangeText={(text) => setEmail(text)}
                    secureTextEntry={false}
                />
                <InputBox
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <SubmitButton title="Sign In" onPress={handleSignIn}/>

            <TouchableOpacity style={styles.forgotView}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <SocialButton title="Sign in with Facebook" backgroundcolor="#39569c" />
            <SocialButton title="Sign in with Google" backgroundcolor="#de5246" />
            <TouchableOpacity style={styles.createView}>
                <Text style={styles.createText} onPress={handleSignUpPress}>Don't have an account? Create one here</Text>
            </TouchableOpacity>
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
    forgotView: {
        marginHorizontal: 100,
        padding: 10,
        flex: 0.03
    },
    forgotText: {
        textAlign: 'center',
        color: 'black'
    },
    createView: {
        flex: 0.12,
        marginHorizontal: 80,
        padding: 10,
        marginTop: 30,
    },
    createText: {
        textAlign: 'center',
        color: 'black'
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        marginHorizontal: 50,
    },
})
