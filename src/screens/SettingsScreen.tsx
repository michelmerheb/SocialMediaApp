import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen() {

    const settingsOptions = [
        { name: "Account Settings", icon: "person-circle-outline" },
        { name: "Security and Privacy", icon: "lock-closed-outline" },
        { name: "Notification", icon: "notifications-outline" },
        { name: "Display", icon: "color-palette-outline" },
        { name: "Language", icon: "language-outline" },
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Settings</Text>
        
        {settingsOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.settingsButton}>
                <View style={styles.settingsOptionContainer}>
                    <Ionicons name={option.icon} size={24} color="white" style={styles.iconStyle}/>
                    <Text style={styles.settingsButtonText}>{option.name}</Text>
                </View>
            </TouchableOpacity>
        ))}

      </View>
    );
}

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  settingsButton: {
    margin: 30,
    marginHorizontal: 50,
    height: 45,
    justifyContent: 'center',

  },
  settingsButtonText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  settingsOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 10,
  },
});
