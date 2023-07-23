import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as St from './styles';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Accessory from '../../components/Accessory';

import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Car as ModelCar } from '../../database/model/Car';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
interface Params {
  car: ModelCar;
}

export default function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>( {} as CarDTO );

    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const { car } = route.params as Params;

    const scrollY = useSharedValue( 0 );
    const scrollHandler = useAnimatedScrollHandler( ( event ) => {
        scrollY.value = event.contentOffset.y;
    } );

    const headerStyleAnimation = useAnimatedStyle( () => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        };
    } );
    const sliderCarsStyleAnimation = useAnimatedStyle( () => {
        return {
            opacity: interpolate( scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP ),
        };
    } );
    function handleConfirmRental() {
        navigation.navigate( 'Scheduling', { car } );
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect( () => {
        async function fetchCarUpdated() {
            const response =await api.get( `/cars/${car.id}` );
            setCarUpdated( response.data );
        }
        if( netInfo.isConnected )
            fetchCarUpdated();
        
    }, [netInfo.isConnected] );
    return (
        <St.Container>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary },
                ]}
            >
                <St.Header>
                    <BackButton onPress={handleBack} />
                </St.Header>
                <Animated.View style={[sliderCarsStyleAnimation]}>
                    <St.CarImages>
                        <ImageSlider imagesUrl={carUpdated.photos
                            ? carUpdated.photos
                            : [{ id: car.thumbnail, photo: car.thumbnail }]} />
                    </St.CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    padding: 24,
                    paddingTop: getStatusBarHeight() + 190,
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <St.Details>
                    <St.Description>
                        <St.Brand>{car.brand}</St.Brand>
                        <St.Name>{car.name}</St.Name>
                    </St.Description>
                    <St.Rent>
                        <St.Period>{car.period}</St.Period>
                        <St.Price>R$ {netInfo.isConnected === true
                            ? car.price
                            : '...'}</St.Price>
                    </St.Rent>
                </St.Details>
                <St.Accessories>
                    {carUpdated.accessories && carUpdated.accessories.map( ( accessory ) => (
                        <Accessory
                            name={accessory.name}
                            key={accessory.type}
                            icon={getAccessoryIcon( accessory.type )}
                        />
                    ) )}
                </St.Accessories>

                <St.About>{car.about}</St.About>
            </Animated.ScrollView>
            <St.Footer>

                <Button
                    title={'Escolher período do aluguel'}
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                />
                {
                    netInfo.isConnected === false &&
                     <St.OfflineInfo>Conecte-se a Internet para ver mais detalhes e agendar seu carro</St.OfflineInfo>
                }
            </St.Footer>
        </St.Container>
    );
}

const styles = StyleSheet.create( {
    header: { position: 'absolute', overflow: 'hidden', zIndex: 1 },
    back: { marginTop: 24 },
} );
