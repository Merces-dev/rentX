import React, { useEffect, useState } from "react";
import * as St from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import BackButton from "../../components/BackButton";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, FlatList } from "react-native";
import Car from "../../components/Car";

import { AntDesign } from "@expo/vector-icons";
import { LoadAnimation } from "../../components/LoadAnimation";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [isFetchingCars, setIsFetchingCars] = useState<boolean>(true);
  const navigation = useNavigation();
  const theme = useTheme();

  async function fetchCars() {
    try {
      setIsFetchingCars(true);

      const response = await api.get("/schedules_byuser?user_id=1");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingCars(false);
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetchCars();
  }, []);

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
          Seus agendamentos,{"\n"}estâo aqui.
        </St.Title>
        <St.SubTitle>Conforto, segurança e praticidade.</St.SubTitle>
      </St.Header>
      {isFetchingCars ? (
        <LoadAnimation />
      ) : (
        <St.Content>
          <St.Appointments>
            <St.AppointmentsTitle>Agendamentos feitos</St.AppointmentsTitle>
            <St.AppointmentsQuantity>{cars.length}</St.AppointmentsQuantity>
          </St.Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <St.CarWrapper>
                <Car data={item.car} />
                <St.CarFooter>
                  <St.CarFooterTitle>Período</St.CarFooterTitle>
                  <St.CarFooterPeriod>
                    <St.CarFooterDate>{item.startDate}</St.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <St.CarFooterDate>{item.endDate}</St.CarFooterDate>
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
