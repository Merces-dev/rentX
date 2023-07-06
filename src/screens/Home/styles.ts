import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    background-color: ${({ theme }) => theme.colors.background_primary};
`
export const Title = styled.Text`
    font-size: 30px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
`
export const CarList = styled.FlatList.attrs({
    contentContainer: { padding: 24 },
    showsVerticalScrollIndicator: false
})`
`