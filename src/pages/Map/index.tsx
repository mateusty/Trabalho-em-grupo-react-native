import MapView from 'react-native-maps';
import { styles } from './style';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchButton from '../../components/SwitchButton';

export const Map = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <Text style={styles.subTitle}>Mapa visual</Text>
      <View style={styles.contentContainer}>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtonContainer}
        >
        <SwitchButton>Cadeirante</SwitchButton> 
        <SwitchButton>Visual</SwitchButton>
        <SwitchButton>Mobilidade Limitada</SwitchButton>
        <SwitchButton>Outros</SwitchButton>
        </ScrollView>
        <View style={styles.mapContainer}>
          <MapView style={styles.map}/>
        </View>
        <View style={styles.accessibilityLevelCaption}>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#109D57'/><Text style={styles.captionText}>Resolvido</Text></View>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#FABD03'/><Text style={styles.captionText}>Intermediário</Text></View>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#D83025'/><Text style={styles.captionText}>Inacessível</Text></View>
        </View>
        <TouchableOpacity style={styles.accessibleMapButton}><Ionicons name='list' size={26} color='#F8F9FA'/><Text style={styles.accessibleMapButtonText}>Modo de lista para baixa visão</Text></TouchableOpacity>
      </View>
    </ScrollView>
  )
}

