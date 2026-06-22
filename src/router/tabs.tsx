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
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles'; 

const Tab = createBottomTabNavigator<ParametrosRotasTabs>();

export function TabsRouter() {
  
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true, 
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIconGlobal,
        tabBarStyle: [
          styles.tabBarContainer,
          {
            paddingBottom: insets.bottom,
            height: 70 + insets.bottom,
          }
        ],
        tabBarActiveTintColor: '#3B75B0',
        tabBarInactiveTintColor: '#777777',
      }}
    >
      <Tab.Screen 
        name="TabsHome" 
        component={Home} 
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='home-outline' color={color} size={size + 4} />
          )
        }}
      />

      <Tab.Screen 
        name="TabsObstaculos" 
        component={Obstacles} 
        options={{
          tabBarLabel: 'Ocorrências',
          tabBarActiveTintColor: '#D83025',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='warning-outline' color={color} size={size + 4} />
          )
        }}
      />

      <Tab.Screen 
        name="TabsForm" 
        component={Form} 
        options={{
          tabBarLabel: '',
          tabBarAccessibilityLabel: 'Reportar novo obstáculo',
          tabBarIcon: () => (
            <View style={styles.botaoFlutuante} importantForAccessibility="no">
              <Ionicons name="add" color="white" size={35}/>
            </View>
          )
        }}
      />

      <Tab.Screen 
        name="TabsMapa" 
        component={Map} 
        options={{
          tabBarLabel: 'Mapa',
          tabBarActiveTintColor: '#109D57',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='location-outline' color={color} size={size + 4} />
          )
        }}
      />

      <Tab.Screen
        name="OpenDrawer"
        component={Sobre}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })} 
        options={{
          tabBarLabel: 'Menu',
          tabBarAccessibilityLabel: 'Menu de opções lateral',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" color={color} size={size + 4} />
          )
        }}
      />
    </Tab.Navigator>
  );
}