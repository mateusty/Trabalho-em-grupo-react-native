import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, Modal, TextInput, Alert, StyleSheet, } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import ObstacleCard from '../../components/ObstacleCard';
import { GravityLevel, ObstacleCardType, ObstacleCategory } from '../../types/obstacle';

const DEFAULT_AVATAR = require('../../assets/avatar.png');

interface Obstaculo {
  id: number;
  data_criacao: string;
  profile_id: string;
  categoria: string;
  gravidade: string;
  descricao: string;
  latitude: number;
  longitude: number;
  fotos_url: string[];
}

// Validação de categoria
const isValidCategory = (value: string): value is ObstacleCategory => {
  const categories: ObstacleCategory[] = [
    'buraco', 'rampa_bloqueada', 'elevador_quebrado', 'objeto_aereo',
    'calcada_obstruida', 'semaforo_quebrado', 'falta_de_acessibilidade', 'outro'
  ];
  return categories.includes(value as ObstacleCategory);
};

// Validação de gravidade
const isValidGravity = (value: string): value is GravityLevel => {
  const levels: GravityLevel[] = ['resolvido', 'intermediario', 'inacessivel'];
  return levels.includes(value as GravityLevel);
};

// Mapeia os dados do Supabase para ObstacleCardType
const mapObstacleToCard = (item: Obstaculo): ObstacleCardType => ({
  id: item.id,
  data_criacao: new Date(item.data_criacao).toLocaleDateString('pt-BR'),
  categoria: isValidCategory(item.categoria) ? item.categoria : 'outro',
  gravidade: isValidGravity(item.gravidade) ? item.gravidade : 'intermediario',
  descricao: item.descricao,
});

export const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [obstaculos, setObstaculos] = useState<Obstaculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estado para o modal de edição do obstáculo
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedObstacle, setSelectedObstacle] = useState<Obstaculo | null>(null);
  const [newGravidade, setNewGravidade] = useState('');

  // Estado para o modal de edição do perfil
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [newNome, setNewNome] = useState(user?.nome || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const isGoogleUser = user?.foto_url?.startsWith('https://lh3.googleusercontent.com') || false;


  const carregarObstaculos = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('obstaculos')
        .select('*')
        .eq('profile_id', user.id)
        .order('data_criacao', { ascending: false });

      if (error) throw error;
      setObstaculos(data || []);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: (error as Error).message });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    carregarObstaculos();
  };

  React.useEffect(() => {
    carregarObstaculos();
  }, [carregarObstaculos]);

  // Abrir modal de edição do obstáculo
  const openEditModal = (item: Obstaculo) => {
    setSelectedObstacle(item);
    setNewGravidade(item.gravidade);
    setModalVisible(true);
  };

  // Salvar alteração da gravidade
  const handleUpdateGravidade = async () => {
    if (!selectedObstacle) return;
    try {
      const { error } = await supabase
        .from('obstaculos')
        .update({ gravidade: newGravidade })
        .eq('id', selectedObstacle.id);
      if (error) throw error;
      Toast.show({ type: 'success', text1: 'Gravidade atualizada!' });
      setModalVisible(false);
      carregarObstaculos(); // recarrega a lista
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: (error as Error).message });
    }
  };

  // Remover obstáculo
  const handleDeleteObstacle = async () => {
    if (!selectedObstacle) return;
    Alert.alert(
      'Remover relato',
      'Tem certeza que deseja remover este relato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('obstaculos')
                .delete()
                .eq('id', selectedObstacle.id);
              if (error) throw error;
              Toast.show({ type: 'success', text1: 'Relato removido!' });
              setModalVisible(false);
              carregarObstaculos();
            } catch (error) {
              Toast.show({ type: 'error', text1: 'Erro', text2: (error as Error).message });
            }
          },
        },
      ]
    );
  };

  // Salvar edição do perfil
  const handleUpdateProfile = async () => {
    try {
      // Atualizar nome e email (se for diferente e não for Google)
      const updates: any = {};
      if (newNome.trim() && newNome !== user?.nome) updates.nome = newNome.trim();
      if (newEmail.trim() && newEmail !== user?.email && !isGoogleUser) updates.email = newEmail.trim();

      if (Object.keys(updates).length > 0) {
        await updateUser(updates);
      }

      // Se for conta não-Google e a senha foi preenchida, atualizar
      if (!isGoogleUser && newPassword.trim()) {
        const { error } = await supabase.auth.updateUser({ password: newPassword.trim() });
        if (error) throw error;
      }

      Toast.show({ type: 'success', text1: 'Perfil atualizado!' });
      setEditProfileVisible(false);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: (error as Error).message });
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Perfil do usuário */}
      <View style={styles.profileSection}>
        <Image
          source={user.foto_url ? { uri: user.foto_url } : DEFAULT_AVATAR}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.nome}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {isGoogleUser ? (
          <Text style={styles.googleHint}>
            Para alterar suas informações, configure seu perfil do Google
          </Text>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setEditProfileVisible(true)}>
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        )}
        {!isGoogleUser && (
          <Text style={styles.photoHint}>Para ter foto personalizada, entre com o Google</Text>
        )}
      </View>

      {/* Lista de obstáculos */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Meus relatos</Text>
      </View>

      <FlatList
        data={obstaculos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <ObstacleCard {...mapObstacleToCard(item)} />
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum obstáculo relatado ainda</Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Modal de edição do obstáculo */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar relato</Text>
            <Text style={styles.modalSubtitle}>Altere a gravidade ou remova o relato</Text>

            {/* Opções de gravidade */}
            <View style={styles.gravidadeOptions}>
              {['resolvido', 'intermediario', 'inacessivel'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.gravidadeOption,
                    newGravidade === g && styles.gravidadeOptionSelected,
                  ]}
                  onPress={() => setNewGravidade(g)}
                >
                  <Text style={styles.gravidadeOptionText}>
                    {g === 'resolvido' ? 'Resolvido' : g === 'intermediario' ? 'Intermediário' : 'Inacessível'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonSave} onPress={handleUpdateGravidade}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonDelete} onPress={handleDeleteObstacle}>
                <Text style={styles.modalButtonText}>Remover</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de edição do perfil */}
      <Modal visible={editProfileVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar perfil</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={newNome}
              onChangeText={setNewNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newEmail}
              onChangeText={setNewEmail}
              editable={!isGoogleUser}
            />
            {!isGoogleUser && (
              <TextInput
                style={styles.input}
                placeholder="Nova senha (opcional)"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonSave} onPress={handleUpdateProfile}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setEditProfileVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#ddd' },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  googleHint: { fontSize: 12, fontStyle: 'italic', color: '#999', marginTop: 8, textAlign: 'center' },
  photoHint: { fontSize: 12, fontStyle: 'italic', color: '#999', marginTop: 4, textAlign: 'center' },
  editButton: { marginTop: 8, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#f0f0f0', borderRadius: 6 },
  editButtonText: { color: '#007AFF' },
  listHeader: { paddingHorizontal: 20, paddingVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, color: '#999', marginTop: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '90%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  gravidadeOptions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  gravidadeOption: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  gravidadeOptionSelected: { borderColor: '#007AFF', backgroundColor: '#e6f0ff' },
  gravidadeOptionText: { fontSize: 14 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButtonSave: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, flex: 1, marginRight: 8 },
  modalButtonDelete: { backgroundColor: '#ff3b30', padding: 12, borderRadius: 8, flex: 1, marginRight: 8 },
  modalButtonCancel: { backgroundColor: '#ccc', padding: 12, borderRadius: 8, flex: 1 },
  modalButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
