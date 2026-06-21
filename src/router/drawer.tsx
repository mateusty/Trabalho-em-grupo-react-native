import { createDrawerNavigator } from '@react-navigation/drawer';
import { Sobre } from '../pages/Sobre';
import { Perfil } from '../pages/Perfil';
import { Configuracoes } from '../pages/Configuracoes';
import { TabsRouter } from './tabs';
import { Header } from '../components/Header';
import { DrawerContent } from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

export function DrawerRouter() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#E2E2E2',
          borderLeftWidth: 1,
          borderLeftColor: '#777777',
        },
        drawerLabelStyle: { fontSize: 18 },
        drawerItemStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#777777',
          borderRadius: 3,
        },
        drawerType: 'slide',
        swipeEdgeWidth: 100,
        drawerActiveTintColor: '#3B75B0',
        drawerInactiveTintColor: '#777777',
        drawerActiveBackgroundColor: '#3B75B030',
        header: ({ options }) => <Header title={options.title} />,
      }}
    >
      <Drawer.Screen
        name="TabsRouter"
        component={TabsRouter}
        options={{ headerShown: false, drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{ drawerLabel: 'Perfil' }}
      />
      <Drawer.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{ drawerLabel: 'Configurações' }}
      />
      <Drawer.Screen
        name="DrawerSobre"
        component={Sobre}
        options={{ drawerLabel: 'Sobre' }}
      />
    </Drawer.Navigator>
  );
}