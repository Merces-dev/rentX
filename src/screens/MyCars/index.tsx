import React, { useEffect, useState } from 'react';
import * as St from './styles';
import { api } from '../../services/api';
import BackButton from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar, FlatList } from 'react-native';
import Car from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';

import { AntDesign } from '@expo/vector-icons';
import { LoadAnimation } from '../../components/LoadAnimation';
import { format, parseISO } from 'date-fns';

interface DataProps{
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}
export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>( [] as DataProps[] );
    const [isFetchingCars, setIsFetchingCars] = useState<boolean>( true );
    const screenIsFocused = useIsFocused();
    const navigation = useNavigation();
    const theme = useTheme();

    async function fetchCars() {
        try {
            setIsFetchingCars( true );

            const response = await api.get( '/rentals' );
            const dataFormatted = response.data.map( ( data: DataProps ) => {
                return{
                    id: data.id,
                    car: data.car, 
                    start_date: format( parseISO( data.start_date ), 'dd/MM/yyyy' ),
                    end_date: format( parseISO( data.end_date ), 'dd/MM/yyyy' )
                };
            } );

            setCars( dataFormatted );
        } catch ( error ) {
            console.log( error );
        } finally {
            setIsFetchingCars( false );
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect( () => {
        fetchCars();
    }, [screenIsFocused] );

    return (
        <St.Container>
            <St.Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={handleBack} color={theme.colors.shape} />
                <St.Title>
          Seus agendamentos,{'\n'}estâo aqui.
                </St.Title>
                <St.SubTitle>Conforto, segurança e praticidade.</St.SubTitle>
            </St.Header>
            {isFetchingCars
                ? (
                    <LoadAnimation />
                )
                : (
                    <St.Content>
                        <St.Appointments>
                            <St.AppointmentsTitle>Agendamentos feitos</St.AppointmentsTitle>
                            <St.AppointmentsQuantity>{cars.length}</St.AppointmentsQuantity>
                        </St.Appointments>

                        <FlatList
                            data={cars}
                            keyExtractor={( item ) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={( { item } ) => (
                                <St.CarWrapper>
                                    <Car data={item.car} />
                                    <St.CarFooter>
                                        <St.CarFooterTitle>Período</St.CarFooterTitle>
                                        <St.CarFooterPeriod>
                                            <St.CarFooterDate>{item.start_date}</St.CarFooterDate>
                                            <AntDesign
                                                name="arrowright"
                                                size={20}
                                                color={theme.colors.title}
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <St.CarFooterDate>{item.end_date}</St.CarFooterDate>
                                        </St.CarFooterPeriod>
                                    </St.CarFooter>
                                </St.CarWrapper>
                            )}
                        />
                    </St.Content>
                )}
        </St.Container>
    );
}
