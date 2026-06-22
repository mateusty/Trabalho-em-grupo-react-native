import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { Routers } from './src/router';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsCarregadas] = useFonts({
    'Montserrat-Bold': Montserrat_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
  });

  useEffect(() => {
    if (fontsCarregadas) {
      SplashScreen.hideAsync(); 
    }
  }, [fontsCarregadas]);

  if (!fontsCarregadas) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Routers />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}