import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    Toast.show({ type: 'info', text1: 'Até logo!' });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#D93025" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    backgroundColor: '#E2E2E2',
    position: 'absolute',
    bottom: 15,
    right: 0,
  },
  logoutText: {
    fontSize: 18,
    color: '#ff3b30',
    fontWeight: '500',
    marginLeft: 12,
  }
});
