import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native"
import { BorderlessButton } from "react-native-gesture-handler"

export const Container = styled(BorderlessButton)`
    width: 100%;
    padding: 19px;
    align-items: center;
    justify-content: center;
`
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.shape};
`