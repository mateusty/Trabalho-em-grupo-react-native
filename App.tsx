import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { Routers } from './src/router';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useCallback } from 'react'; // Importado useCallback
import { View } from 'react-native'; // Importado View
import * as SplashScreen from 'expo-splash-screen';

// Garante que a splash fique travada no início
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsCarregadas] = useFonts({
    'Montserrat-Bold': Montserrat_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsCarregadas) {
      await SplashScreen.hideAsync(); 
    }
  }, [fontsCarregadas]);

  if (!fontsCarregadas) {
    return null;
  }

  return (
    // Colocamos essa View por fora de tudo. Quando ela renderizar as rotas, ela avisa o onLayout
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <NavigationContainer>
          <Routers />
          <Toast />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}