import { createStackNavigator } from '@react-navigation/stack';
import { LoginCadastro } from '../pages/LoginCadastro';
import { DrawerRouter } from './drawer';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

export function StackRouter() {
  const { user } = useAuth();

  const shouldRedirect = user && user.tipo_deficiencia && user.tipo_deficiencia !== '';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!shouldRedirect ? (
        <Stack.Screen name="Login" component={LoginCadastro} />
      ) : (
        <Stack.Screen name="Drawer" component={DrawerRouter} />
      )}
    </Stack.Navigator>
  );
}