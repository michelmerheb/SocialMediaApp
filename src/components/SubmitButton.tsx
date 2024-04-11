import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


interface TitleProps {
    title: string;
    onPress: () => void;
    buttonStyle?: object;
}

export default function SubmitButton({title, onPress, buttonStyle }: TitleProps) {
    return(
        <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress} >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
    minHeight: 50,
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    marginHorizontal: 50,
    marginBottom: 10,
    borderRadius: 5,
    },
    buttonText:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
})
