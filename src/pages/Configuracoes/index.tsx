import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Linking, StyleSheet, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

export const Configuracoes = () => {
  const [permissoes, setPermissoes] = useState({
    camera: false,
    galeria: false,
    localizacao: false,
  });

  // Verificar permissões ao montar
  useEffect(() => {
    const checkPermissions = async () => {
      const camera = (await ImagePicker.getCameraPermissionsAsync()).granted;
      const galeria = (await ImagePicker.getMediaLibraryPermissionsAsync()).granted;
      const localizacao = (await Location.getForegroundPermissionsAsync()).granted;

      setPermissoes({
        camera: camera || false,
        galeria: galeria || false,
        localizacao: localizacao || false,
      });
    };
    checkPermissions();
  }, []);

  // Função para abrir configurações do app
  const openAppSettings = () => {
    Linking.openSettings().catch(() =>
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível abrir as configurações.',
      })
    );
  };

  // Função para pedir ou gerenciar permissão
  const handlePermissionToggle = async (tipo: 'camera' | 'galeria' | 'localizacao' ) => {
    try {
      // Se já estiver concedida, oferece opção de revogar (abrir configurações)
      if (permissoes[tipo]) {
        Alert.alert(
          'Permissão já concedida',
          'Para revogar essa permissão, vá até as configurações do dispositivo.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Abrir configurações', onPress: openAppSettings },
          ]
        );
        return;
      }

      // Caso contrário, pede a permissão
      let granted = false;
      let message = '';

      switch (tipo) {
        case 'camera': {
          const result = await ImagePicker.requestCameraPermissionsAsync();
          granted = result.granted;
          message = granted ? 'Permissão de câmera concedida!' : 'Permissão de câmera negada.';
          if (!granted && !result.canAskAgain) {
            Alert.alert(
              'Permissão negada permanentemente',
              'Para usar a câmera, ative a permissão nas configurações do dispositivo.',
              [{ text: 'Cancelar', style: 'cancel' }, { text: 'Abrir configurações', onPress: openAppSettings }]
            );
            return;
          }
          break;
        }
        case 'galeria': {
          const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
          granted = result.granted;
          message = granted ? 'Permissão de galeria concedida!' : 'Permissão de galeria negada.';
          if (!granted && !result.canAskAgain) {
            Alert.alert(
              'Permissão negada permanentemente',
              'Para acessar a galeria, ative a permissão nas configurações do dispositivo.',
              [{ text: 'Cancelar', style: 'cancel' }, { text: 'Abrir configurações', onPress: openAppSettings }]
            );
            return;
          }
          break;
        }
        case 'localizacao': {
          const result = await Location.requestForegroundPermissionsAsync();
          granted = result.granted;
          message = granted ? 'Permissão de localização concedida!' : 'Permissão de localização negada.';
          if (!granted && !result.canAskAgain) {
            Alert.alert(
              'Permissão negada permanentemente',
              'Para usar a localização, ative a permissão nas configurações do dispositivo.',
              [{ text: 'Cancelar', style: 'cancel' }, { text: 'Abrir configurações', onPress: openAppSettings }]
            );
            return;
          }
          break;
        }
        default:
          return;
      }

      // Atualiza o estado
      setPermissoes((prev) => ({ ...prev, [tipo]: granted }));

      if (granted) {
        Toast.show({ type: 'success', text1: message });
      } else {
        Toast.show({ type: 'error', text1: 'Permissão negada', text2: message });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: (error as Error).message });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header} accessibilityRole="header">Configurações</Text>

      <Text style={styles.sectionTitle} accessibilityRole="header">Permissões</Text>

      <PermissionItem
        label="Câmera"
        icon="camera-outline"
        description="Acesso à câmera para fotos"
        isGranted={permissoes.camera}
        onToggle={() => handlePermissionToggle('camera')}
      />
      <PermissionItem
        label="Galeria"
        icon="images-outline"
        description="Acesso à galeria de fotos"
        isGranted={permissoes.galeria}
        onToggle={() => handlePermissionToggle('galeria')}
      />
      <PermissionItem
        label="Localização"
        icon="location-outline"
        description="Acesso à localização para mapas"
        isGranted={permissoes.localizacao}
        onToggle={() => handlePermissionToggle('localizacao')}
      />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Sobre</Text>
      <View style={styles.aboutRow}>
        <Text style={styles.aboutText}>Versão</Text>
        <Text style={styles.aboutText}>1.0.0</Text>
      </View>
    </ScrollView>
  );
};

// -------------------- Subcomponente Item de Permissão com Switch --------------------

interface PermissionItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  isGranted: boolean;
  onToggle: () => void;
}

const PermissionItem = ({ label, icon, description, isGranted, onToggle }: PermissionItemProps) => (
  <View style={styles.permissionItem}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{ checked: isGranted }} 
      accessibilityLabel={`Configuração de permissão para ${label}. Status atual: ${isGranted ? 'ativado' : 'desativado'}.`}
      accessibilityHint={`Toque duas vezes para alterar o acesso à ${label.toLowerCase()}.`}
      onTouchEnd={onToggle}
  >
    <Ionicons name={icon} size={24} color="#007AFF" style={styles.permissionIcon} importantForAccessibility="no"/>
    <View style={styles.permissionTextContainer}>
      <Text style={styles.permissionLabel}>{label}</Text>
      <Text style={styles.permissionDescription}>{description}</Text>
    </View>
    <Switch
      value={isGranted}
      onValueChange={onToggle}
      trackColor={{ false: '#ccc', true: '#34C759' }}
      thumbColor={isGranted ? '#fff' : '#f4f3f4'}
      ios_backgroundColor="#ccc"
      importantForAccessibility="no" 
      pointerEvents="none"
    />
  </View>
);

// -------------------- Estilos --------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  permissionIcon: {
    marginRight: 12,
  },
  permissionTextContainer: {
    flex: 1,
  },
  permissionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  permissionDescription: {
    fontSize: 12,
    color: '#666',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  aboutText: {
    fontSize: 16,
    color: '#000',
  },
});
