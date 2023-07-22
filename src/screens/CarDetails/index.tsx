import React from 'react';
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

interface Params {
  car: CarDTO;
}

export default function CarDetails() {
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
                        <ImageSlider imagesUrl={car.photos} />
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
                        <St.Price>R$ {car.price}</St.Price>
                    </St.Rent>
                </St.Details>
                <St.Accessories>
                    {car.accessories.map( ( accessory ) => (
                        <Accessory
                            name={accessory.name}
                            key={accessory.type}
                            icon={getAccessoryIcon( accessory.type )}
                        />
                    ) )}
                </St.Accessories>

                <St.About>{car.about}</St.About>
                <St.About>{car.about}</St.About>
                <St.About>{car.about}</St.About>
                <St.About>{car.about}</St.About>
                <St.About>{car.about}</St.About>
                <St.About>{car.about}</St.About>
            </Animated.ScrollView>
            <St.Footer>
                <Button
                    title={'Escolher período do aluguel'}
                    onPress={handleConfirmRental}
                />
            </St.Footer>
        </St.Container>
    );
}

const styles = StyleSheet.create( {
    header: { position: 'absolute', overflow: 'hidden', zIndex: 1 },
    back: { marginTop: 24 },
} );
