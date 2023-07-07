import React from 'react'
import * as St from "./styles"
import { MaterialIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { BorderlessButtonProps } from "react-native-gesture-handler"

interface SliderProps {
    imagesUrl: string[]
}
export default function ImageSlider({ imagesUrl }: SliderProps) {
    const theme = useTheme()

    return (
        <St.Container>

            <St.ImageIndexes >
                <St.ImageIndex active={true} />
                <St.ImageIndex active={true} />
                <St.ImageIndex active={true} />
                <St.ImageIndex active={false} />

            </St.ImageIndexes>
            <St.CarImageWrapper>
                <St.CarImage
                    source={{ uri: imagesUrl[0] }}
                    resizeMode="contain"
                />
            </St.CarImageWrapper>
        </St.Container>
    )
}

