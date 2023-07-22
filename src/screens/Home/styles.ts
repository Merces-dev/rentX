import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Car } from '../../database/model/Car';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    background-color: ${( { theme } ) => theme.colors.background_primary};
`;
export const Title = styled.Text`
    font-size: 30px;
    font-family: ${( { theme } ) => theme.fonts.secondary_600};
`;
export const CarList = styled( FlatList as new () => FlatList<Car> ).attrs( {
    showsVerticalScrollIndicator: false
} )`
`;
