import React from 'react';
import * as St from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/model/Car';
import { useNetInfo } from '@react-native-community/netinfo';

interface Props extends RectButtonProps {
  data: ModelCar;
}

export default function Car( { data, ...rest }: Props ) {
    const netInfo = useNetInfo();

    const MotorIcon = getAccessoryIcon( data.fuel_type );
    return (
        <St.Container {...rest}>
            <St.Details>
                <St.Brand>{data.brand}</St.Brand>
                <St.Name>{data.name}</St.Name>
                <St.About>
                    <St.Rent>
                        <St.Period>{data.period}</St.Period>
                        <St.Price>R$ {netInfo.isConnected
                            ? data.price
                            : '...'}</St.Price>
                    </St.Rent>
                    <St.Type>
                        <MotorIcon />
                    </St.Type>
                </St.About>
            </St.Details>
            <St.CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
        </St.Container>
    );
}
