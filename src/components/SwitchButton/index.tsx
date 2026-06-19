import { Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native'
import { styles } from './style'
import React, { useState } from 'react'

type SwitchButtonProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  isActive?: boolean
  onPress?: () => void
}

export default function SwitchButton({ children, style, isActive, onPress }: SwitchButtonProps) {

  return (
    <TouchableOpacity
      style={[styles.button, style, isActive && styles.buttonOn]}
      onPress={() => {
        onPress?.()
      }}
    >

      <Text style={isActive ? styles.textOn : styles.textOff}>
        {children}
      </Text>

    </TouchableOpacity>
  )
}