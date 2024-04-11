import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface TitleProps {
    title: string;
    backgroundcolor: string;
}

export default function SocialButton({title, backgroundcolor}: TitleProps) {
    return(

            
            <TouchableOpacity style={[styles.button, {backgroundColor: backgroundcolor}]}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
        marginHorizontal: 50,  
        borderRadius: 5,
        marginTop: 10
    },
    buttonText:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
})
