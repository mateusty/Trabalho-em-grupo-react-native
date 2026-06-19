import { Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native'
import { styles } from './style'
import React, { useState } from 'react'

type SwitchButtonProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export default function SwitchButton({ children, style, onPress }: SwitchButtonProps) {

  const [active, setActive] = useState(false)

  return (
    <TouchableOpacity
      style={[styles.button, style, active && styles.buttonOn]}
      onPress={() => {
        setActive(!active)
        onPress?.()
      }}
    >

      <Text style={active ? styles.textOn : styles.textOff}>
        {children}
      </Text>

    </TouchableOpacity>
  )
}