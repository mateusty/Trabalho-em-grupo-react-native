import { useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, FlatList, ActivityIndicator, RefreshControl, ListRenderItem } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { HeaderHome } from '../../components/HeaderHome'
import { WelcomeSection } from '../../components/WelcomeSection'
import { StatsCard } from '../../components/StatsCard'
import { MapButton } from '../../components/MapButton'
import { ActivityItem } from '../../components/ActivityItem'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabaseClient'
import { Obstacle } from '../../types/obstacle'
import { styles } from './style'

interface HomeStats {
  totalRelatos: number
  relatosSemana: number
}

const MS_POR_DIA = 1000 * 60 * 60 * 24

function formatarTempoRelativo(dataISO: string): string {
  const diffMs = Date.now() - new Date(dataISO).getTime()
  const diffMinutos = Math.floor(diffMs / (1000 * 60))
  const diffHoras = Math.floor(diffMinutos / 60)
  const diffDias = Math.floor(diffHoras / 24)

  if (diffMinutos < 1) return 'agora'
  if (diffMinutos < 60) return `há ${diffMinutos} min`
  if (diffHoras < 24) return `há ${diffHoras}h`
  if (diffDias === 1) return 'há 1 dia'
  return `há ${diffDias} dias`
}

export const Home = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  const [obstaculos, setObstaculos] = useState<Obstacle[]>([])
  const [stats, setStats] = useState<HomeStats>({ totalRelatos: 0, relatosSemana: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const carregarDados = useCallback(async () => {
    if (!user) return
    const seteDiasAtras = new Date(Date.now() - 7 * MS_POR_DIA).toISOString()
    const [recentesResult, totalResult, semanaResult] = await Promise.all([
      supabase.from('obstaculos').select('*').order('data_criacao', { ascending: false }).limit(10),
      supabase.from('obstaculos').select('id', { count: 'exact', head: true }).eq('profile_id', user.id),
      supabase.from('obstaculos').select('id', { count: 'exact', head: true }).gte('data_criacao', seteDiasAtras),
    ])

    if (recentesResult.data) {
      setObstaculos(recentesResult.data as Obstacle[])
    }

    setStats({
      totalRelatos: totalResult.count ?? 0,
      relatosSemana: semanaResult.count ?? 0,
    })
  }, [user])

  useEffect(() => {
    const carregarInicial = async () => {
      setIsLoading(true)
      await carregarDados()
      setIsLoading(false)
    }

    carregarInicial()
  }, [carregarDados])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await carregarDados()
    setIsRefreshing(false)
  }, [carregarDados])

  const handleAvatarPress = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  const handleMapPress = useCallback(() => {
    navigation.navigate('TabsMapa' as never)
  }, [navigation])

  const renderItem: ListRenderItem<Obstacle> = useCallback(
    ({ item }) => (
      <ActivityItem item={item} timeAgo={formatarTempoRelativo(item.data_criacao)} />
    ),
    []
  )

  const listHeader = useMemo(
    () => (
      <View>
        <WelcomeSection nome={user?.nome ?? ''} />
        <View style={styles.statsRow}>
          <StatsCard value={stats.totalRelatos} label="Relatos enviados" variant="blue" />
          <StatsCard value={stats.relatosSemana} label="Relatos esta semana" variant="dark" />
        </View>
        <MapButton onPress={handleMapPress} />
        <Text style={styles.sectionTitle}>ATIVIDADE RECENTE</Text>
      </View>
    ),
    [user?.nome, stats, handleMapPress]
  )

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Ionicons name="map-outline" size={48} color="#717171" />
        <Text style={styles.emptyTitle}>Nenhum obstáculo relatado ainda</Text>
        <Text style={styles.emptyText}>Seja a primeira pessoa a relatar um obstáculo e ajudar sua comunidade</Text>
      </View>
    ),
    []
  )

  if (isLoading) {
    return (
      <View style={styles.container}>
        <HeaderHome fotoUrl={user?.foto_url} onAvatarPress={handleAvatarPress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1565C0" />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderHome fotoUrl={user?.foto_url} onAvatarPress={handleAvatarPress} />
      <FlatList
        data={obstaculos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={['#1565C0']} tintColor="#1565C0" />
        }
      />
    </View>
  )
}