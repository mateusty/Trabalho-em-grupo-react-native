import { createDrawerNavigator } from '@react-navigation/drawer';
import { Sobre } from '../pages/Sobre';
import { ParametrosRotasDrawer } from './navigation';
import { TabsRouter } from './tabs';
import { Header } from '../components/Header';

const Drawer = createDrawerNavigator<ParametrosRotasDrawer>();

export function DrawerRouter() {
  return (
    <Drawer.Navigator screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#E2E2E2',
          borderLeftWidth: 1,
          borderLeftColor: '#777777',
        },
        drawerLabelStyle: {
          fontSize: 18
        },
        drawerItemStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#777777',
          borderRadius: 3
        },
        drawerType: 'slide',
        swipeEdgeWidth: 50,
        drawerActiveTintColor: '#3B75B0',
        drawerInactiveTintColor: '#777777',
        drawerActiveBackgroundColor: '#3B75B030',
        header: ({ options }) => <Header title={options.title}/>
        }}>
      <Drawer.Screen name="TabsRouter" component={TabsRouter} options={{
        headerShown: false,
        drawerLabel: 'Home'
        }}/>
      <Drawer.Screen name="DrawerSobre" component={Sobre} options={{ drawerLabel: 'Sobre' }}/>
    </Drawer.Navigator>
  );
}