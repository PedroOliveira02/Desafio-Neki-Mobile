import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { SignIn } from './src/screens/SignIn';
import { SignUp } from './src/screens/SignUp';
import { Home } from './src/screens/Home';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  

  return (
    <NativeBaseProvider>
      <StatusBar 
        // barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Home /> : <Text></Text>}
    </NativeBaseProvider>
  );
}

