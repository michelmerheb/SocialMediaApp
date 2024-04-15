import React, {useEffect} from "react";
import NavContainer from "./src/navigation/NavigationContainer";
import { useDispatch  } from 'react-redux';
import { validateToken } from "./src/redux/slices/auth/userAuthSlice ";
import { AppDispatch } from "./src/redux/store/store";
import SplashScreen from 'react-native-splash-screen';
import notifee from '@notifee/react-native'
import { onDisplayNotification } from "./src/components/notifications";

export default function App(){

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    onDisplayNotification();
  }, []);

  useEffect(() => {
    const authenticateAndNavigate = async () => {
      try {
        const isValid = await dispatch(validateToken()).unwrap();

        if (isValid) {
          console.log('Token valid, user is logged in');
        } else {
          console.log('Token invalid, proceed to login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        SplashScreen.hide();
      }
    };

    authenticateAndNavigate();
  }, [dispatch]);

  useEffect(() => {
    async function onDisplayNotification() {
      //Request permission for ios
      await notifee.requestPermission()

    //create channel for android
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    })

    //Display notification
    await notifee.displayNotification({
        title: 'Welcome to BlendIn!',
        body: "Welcome to BlendIn where it's easy to connect with people arounf the globe!",
        android: {
            channelId,
            smallIcon: 'logo',
            pressAction: {
                id: 'default',
            },
        },
    });
  }

  onDisplayNotification();
}, []);
  
  return(
    <NavContainer/>
  )
}


