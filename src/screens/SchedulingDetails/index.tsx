import React, { useEffect, useState } from "react";
import * as St from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Accessory from "../../components/Accessory";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";

interface Params {
  car: CarDTO;
  dates: string[];
}
interface RentalPeriod {
  start: string;
  end: string;
}

export default function SchedulingDetails() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;

  const rentTotal = car.price * dates.length;
  async function getCarSchedules() {
    try {
      const schedulesByCar: any = await api.get(`/schedules_bycars/${car.id}`);
      return schedulesByCar;
    } catch (error) {
      return error;
    }
  }
  async function handleConfirmRental() {
    setIsLoading(true);
    try {
      const schedulesByCar = await getCarSchedules();
      let unavailable_dates = [];
      await api.post("/schedules_byuser", {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end,
      });
      try {
        if (schedulesByCar.data) {
          unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
          ];
          await api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates: unavailable_dates,
          });
        } else {
          unavailable_dates = [...dates];
          await api.post(`/schedules_bycars`, {
            id: car.id,
            unavailable_dates: unavailable_dates,
          });
        }
        navigation.navigate("Confirmation", {
          title: "Carro alugado!",
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel`,
          nextScreenRoute: "Home",
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);

        Alert.alert("Não foi possível confirmar o agendamento.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
      } else {
        console.error(error);
        setIsLoading(false);

        Alert.alert("Ocorreu um erro ao obter os agendamentos do carro.");
      }
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <St.Container>
      <St.Header>
        <BackButton onPress={handleBack} />
      </St.Header>
      <St.CarImages>
        <ImageSlider imagesUrl={car.photos} />
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
          {car.accessories.map((accessory) => (
            <Accessory
              name={accessory.name}
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </St.Accessories>
        <St.RentalPeriod>
          <St.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </St.CalendarIcon>
          <St.DateInfo>
            <St.DateTitle>DE</St.DateTitle>
            <St.DateValue>{rentalPeriod.start}</St.DateValue>
          </St.DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
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
          title={"Alugar Agora"}
          color={theme.colors.success}
          onPress={handleConfirmRental}
          isEnabled={!isLoading}
          isLoading={isLoading}
        />
      </St.Footer>
    </St.Container>
  );
}
