import { Routers } from './src/router';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </AuthProvider>
  );
}

