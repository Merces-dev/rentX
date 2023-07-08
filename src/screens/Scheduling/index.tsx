import React from "react";
import * as St from "./styles";
import BackButton from "../../components/BackButton";
import { useTheme } from "styled-components";

import ArrowSvg from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
const Scheduling = () => {
  const theme = useTheme();
  return (
    <St.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <St.Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />
        <St.Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </St.Title>
        <St.RentalPeriod>
          <St.DateInfo>
            <St.DateTitle>DE</St.DateTitle>
            <St.DateValue selected={false}></St.DateValue>
          </St.DateInfo>
          <ArrowSvg />
          <St.DateInfo>
            <St.DateTitle>ATÉ</St.DateTitle>
            <St.DateValue selected={false}></St.DateValue>
          </St.DateInfo>
        </St.RentalPeriod>
      </St.Header>
      <St.Content>
        <Calendar />
      </St.Content>
      <St.Footer>
        <Button title="Confirmar" />
      </St.Footer>
    </St.Container>
  );
};

export default Scheduling;
