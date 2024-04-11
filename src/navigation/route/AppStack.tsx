import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import MyTab from './AppTab';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLoggedIn);
  return ( 
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={MyTab} options={{headerShown: false}}/>
        </>
      ): (
      <>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignupScreen' component={SignupScreen}/>
      </>
      )}
    </Stack.Navigator>
  );
}
