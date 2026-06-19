import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/Login';
import { ParametrosRotasStack } from './navigation';
import { DrawerRouter } from './drawer';

const Stack = createStackNavigator<ParametrosRotasStack>();

export function StackRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="StackLogin" component={Login} />
      <Stack.Screen name="DrawerRouter" component={DrawerRouter}/>
    </Stack.Navigator>
  );
}