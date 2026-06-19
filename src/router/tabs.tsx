import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParametrosRotasTabs } from './navigation';
import { Home } from '../pages/Home';
import { Sobre } from '../pages/Sobre';
import { DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Map } from '../pages/Map';
import { Obstaculos } from '../pages/Obstaculos';

const Tab = createBottomTabNavigator<ParametrosRotasTabs>();

export function TabsRouter() {

  const insets = useSafeAreaInsets();


  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarStyle: {
        borderTopWidth: 0,
        paddingBottom: insets.bottom,
        height: 50 + insets.bottom,
        borderColor: 'transparent',
        justifyContent: 'center',
      },
      tabBarActiveTintColor: '#16A1FF', // possívelmente mudar as cores depois
      tabBarInactiveTintColor: '#E3E4E9'
    }}>
      <Tab.Screen name="TabsHome" component={Home} />
      <Tab.Screen name="TabsMapa" component={Map} />
      <Tab.Screen
        name="OpenDrawer"
        component={Sobre}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })}
      />
      <Tab.Screen
        name="OpenDrawer"
        component={Obstaculos}
      />

    </Tab.Navigator>
  );
}