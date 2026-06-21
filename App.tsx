import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { Routers } from './src/router';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { ActivityIndicator, View } from 'react-native';
export default function App() {
  const [fontsCarregadas] = useFonts({
    'Montserrat-Bold': Montserrat_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
  });

  if (!fontsCarregadas) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#494949" />
      </View>
    );
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