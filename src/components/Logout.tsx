import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/auth/userAuthSlice ';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import * as Keychain from 'react-native-keychain'

export default function LogoutScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function performLogout() {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(`Token ${credentials.password} has expired.`);
      }

      dispatch(logout());
      await Keychain.resetGenericPassword();
    }

    performLogout();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={styles.logoutText}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutText: {
    color: 'black',
    fontSize: 20
  }
})

