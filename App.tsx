import React, {useEffect} from "react";
import NavContainer from "./src/navigation/NavigationContainer";
import { useDispatch  } from 'react-redux';
import { validateToken } from "./src/redux/slices/auth/userAuthSlice ";
import { AppDispatch } from "./src/redux/store/store";
import SplashScreen from 'react-native-splash-screen';


export default function App(){

  const dispatch = useDispatch<AppDispatch>();

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

  
  return(
    <NavContainer/>
  )
}


