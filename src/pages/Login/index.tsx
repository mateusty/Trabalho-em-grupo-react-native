import { Pressable, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

export const Login = () => {

    const navigate = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Pressable onPress={() => navigate.navigate('DrawerRouter')}>
            <Text>Go Home</Text>
        </Pressable>
    </View>
  )
}
