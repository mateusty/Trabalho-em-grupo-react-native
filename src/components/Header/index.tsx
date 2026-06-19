import { Pressable, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from '@react-navigation/native';
import { styles } from "./style";

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {

    const navigate = useNavigation();

  return (
    <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
            <Pressable onPress={navigate.goBack}>
              <Ionicons name='arrow-back-outline' size={32} color='#494949'/>
          </Pressable>
          <Text style={styles.headerText}>{title ? title : 'ViaLivre'}</Text>
        </View>
        <Pressable onPress={() => navigate.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name='list' size={32} color='#494949'/>
        </Pressable>
    </View>
  )
}
