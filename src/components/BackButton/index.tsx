import React from 'react'
import * as St from "./styles"
import { MaterialIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { BorderlessButtonProps } from "react-native-gesture-handler"

interface BackButtonProps extends BorderlessButtonProps {
  color?: string
}

export default function BackButton({ color, ...rest }: BackButtonProps) {
  const theme = useTheme()
  return (
    <St.Container {...rest}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text}
      />
    </St.Container>
  )
}

