import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParametrosRotasTabs } from './navigation';
import { Home } from '../pages/Home';
import { Sobre } from '../pages/Sobre';
import { DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Map } from '../pages/Map';
import { Obstacles } from '../pages/Obstacles';
import { Ionicons } from '@expo/vector-icons';
import { Form } from '../pages/Form';
import { View } from 'react-native';

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
        borderTopWidth: 1,
        borderColor: '#777',
        backgroundColor: '#E2E2E2',
        paddingBottom: insets.bottom,
        height: 50 + insets.bottom,
        justifyContent: 'center',
      },
      tabBarActiveTintColor: '#3B75B0',
      tabBarInactiveTintColor: '#494949',
    }}>

      <Tab.Screen name="TabsHome" component={Home} options={{
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name={!focused ? 'home-outline' : 'home'} color={color} size={size + 4} />
        )
      }}/>

      <Tab.Screen name="TabsObstaculos" component={Obstacles} options={{
        tabBarActiveTintColor: '#D83025',
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name={!focused ? 'warning-outline' : 'warning'} color={color} size={size + 4} />
        )
      }}/>

      <Tab.Screen name="TabsForm" component={Form} options={{
        tabBarIcon: () => (
            <View style={{borderRadius: '50%', height: 58, width: 58, backgroundColor: '#E65E2A', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 10px #E65E2A'}}>
              <Ionicons name="add" color="#1A1A1A" size={42}/>
            </View>
        )
      }}/>

      <Tab.Screen name="TabsMapa" component={Map} options={{
        tabBarActiveTintColor: '#109D57',
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name={!focused ? 'location-outline' : 'location'} color={color} size={size + 4} />
        )
      }}/>

      <Tab.Screen
        name="OpenDrawer"
        component={Sobre}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="list" color={color} size={size + 4} />
        )
      }}
      />

    </Tab.Navigator>
  );
}