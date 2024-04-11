import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { store } from './src/redux/store/store';
import { Provider } from 'react-redux' 
import 'react-native-gesture-handler';

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => Root);
