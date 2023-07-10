import React, { useState } from "react";
import * as St from "./styles";
import BackButton from "../../components/BackButton";
import { useTheme } from "styled-components";

import ArrowSvg from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import Button from "../../components/Button";
import { Calendar, DayProps, MarkedDateProps } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generateInterval } from "../../utils/generateInterval";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import { CarDTO } from "../../dtos/CarDTO";

export interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface Params {
  car: CarDTO;
}
const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }
  return (
    <St.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <St.Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <St.Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </St.Title>
        <St.RentalPeriod>
          <St.DateInfo>
            <St.DateTitle>DE</St.DateTitle>
            <St.DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </St.DateValue>
          </St.DateInfo>
          <ArrowSvg />
          <St.DateInfo>
            <St.DateTitle>ATÉ</St.DateTitle>
            <St.DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </St.DateValue>
          </St.DateInfo>
        </St.RentalPeriod>
      </St.Header>
      <St.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </St.Content>
      <St.Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          isEnabled={!!rentalPeriod.startFormatted}
        />
      </St.Footer>
    </St.Container>
  );
};

export default Scheduling;
