import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import globalStyles from "../styles/globalStyles";

interface InputBoxProps {
    placeholder: string,
    secureTextEntry: boolean;
    onChangeText: (text: string) => void;
}

export default function InputBox({ onChangeText, placeholder, secureTextEntry}: InputBoxProps) {
    return(
    <View style={styles.container}>
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={[styles.input, globalStyles.textColor]}
            placeholderTextColor={'gray'}
            secureTextEntry={secureTextEntry}
        />
    </View>
    )
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 5
  }
})
