import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native"

export const Container = styled.View`
    height: 113px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.header};

    justify-content: flex-end;

    padding: 32px 24px;
`

export const Content = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

export const Title = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text};
`
