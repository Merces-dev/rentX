import React, { useEffect, useState } from 'react';
import * as St from './styles';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Accessory from '../../components/Accessory';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import { useAuth } from '../../hooks/auth';

interface Params {
  car: CarDTO;
  dates: string[];
}
interface RentalPeriod {
  start: string;
  end: string;
}

export default function SchedulingDetails() {
    const [isLoading, setIsLoading] = useState<boolean>( false );
    const [carUpdated, setCarUpdated] = useState<CarDTO>( {} as CarDTO );

    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
    );
    const navigation = useNavigation();
    const route = useRoute();
    const netInfo = useNetInfo();
    const { user } = useAuth();
    const { car, dates } = route.params as Params;

    const rentTotal = car.price * dates.length;

    async function handleConfirmRental() {
        setIsLoading( true );

        await api.post( '/rentals', {
            user_id: user.id,
            car_id: car.id,
            start_date: new Date( dates[0] ),
            end_date: new Date( dates[dates.length -1] ),
            total: rentTotal
        } ).then( ()=> {
            navigation.navigate( 'Confirmation', {
                title: 'Carro alugado!',
                message: 'Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel',
                nextScreenRoute: 'Home',
            } );
        } ).catch( () => {
            setIsLoading( false );
            Alert.alert( 'Não foi possível confirmar o agendamento.' );
        } );
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect( () => {
        setRentalPeriod( {
            start: format( getPlatformDate( new Date( dates[0] ) ), 'dd/MM/yyyy' ),
            end: format(
                getPlatformDate( new Date( dates[dates.length - 1] ) ),
                'dd/MM/yyyy'
            ),
        } );
    }, [] );
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
            <St.Header>
                <BackButton onPress={handleBack} />
            </St.Header>
            <St.CarImages>
                <ImageSlider imagesUrl={carUpdated.photos
                    ? carUpdated.photos
                    : [{ id: car.thumbnail, photo: car.thumbnail }]} />
            </St.CarImages>
            <St.Content>
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
                    {carUpdated.accessories && carUpdated.accessories.map( ( accessory ) => (
                        <Accessory
                            name={accessory.name}
                            key={accessory.type}
                            icon={getAccessoryIcon( accessory.type )}
                        />
                    ) )}
                </St.Accessories>
                <St.RentalPeriod>
                    <St.CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue( 24 )}
                            color={theme.colors.shape}
                        />
                    </St.CalendarIcon>
                    <St.DateInfo>
                        <St.DateTitle>DE</St.DateTitle>
                        <St.DateValue>{rentalPeriod.start}</St.DateValue>
                    </St.DateInfo>
                    <Feather
                        name="chevron-right"
                        size={RFValue( 10 )}
                        color={theme.colors.text}
                    />
                    <St.DateInfo>
                        <St.DateTitle>ATÉ</St.DateTitle>
                        <St.DateValue>{rentalPeriod.end}</St.DateValue>
                    </St.DateInfo>
                </St.RentalPeriod>
                <St.RentalPrice>
                    <St.RentalPriceLabel>TOTAL</St.RentalPriceLabel>
                    <St.RentalPriceDetails>
                        <St.RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</St.RentalPriceQuota>
                        <St.RentalPriceTotal>R$ {rentTotal}</St.RentalPriceTotal>
                    </St.RentalPriceDetails>
                </St.RentalPrice>
            </St.Content>
            <St.Footer>
                <Button
                    title={'Alugar Agora'}
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    isEnabled={!isLoading}
                    isLoading={isLoading}
                />
            </St.Footer>
        </St.Container>
    );
}
