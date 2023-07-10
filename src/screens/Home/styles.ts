import { FlatList } from "react-native"
import styled from "styled-components/native"
import { CarDTO } from "../../dtos/CarDTO"
import { RectButton } from "react-native-gesture-handler"

export const Container = styled.View`
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    background-color: ${({ theme }) => theme.colors.background_primary};
`
export const Title = styled.Text`
    font-size: 30px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
`
export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
    showsVerticalScrollIndicator: false
})`
`

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;
    border-radius: 30px;

    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.main};

    position: absolute;
    bottom: 13px;
    right: 22px;
`