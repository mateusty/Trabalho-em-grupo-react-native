import { Text, TouchableOpacity } from "react-native"
import { CardCategoriaProps } from "./type"
import { styles } from "./style"

export const CardCategoria= (
    {item, selecionado, onPress} : CardCategoriaProps ) => {

    return(
        <TouchableOpacity 
            key={item.nome} 
            style={[styles.botaoCategoria, selecionado && styles.botaoSelecionado]} 
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="radio"
            accessibilityState={{ selected: selecionado }}
            accessibilityLabel={`Categoria: ${item.label}`}
        >
            <Text style={styles.iconBotao}>{item.emoji}</Text>
            <Text style={styles.labelBotao}>{item.label}</Text>
        </TouchableOpacity>
    )

}