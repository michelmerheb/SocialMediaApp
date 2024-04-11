import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './route/AppStack';
import { linking } from './linking/DeepLinking';
import { Text } from 'react-native';

function NavContainer() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <MyStack/>
    </NavigationContainer>
  );
};

export default NavContainer;