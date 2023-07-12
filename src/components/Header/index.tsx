import React from "react";
import * as St from "./styles";
import Logo from "./../../assets/logo.svg";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
interface HeaderProps {
  carQuantity: number;
  isLoading: boolean;
}
export default function Header({ carQuantity, isLoading }: HeaderProps) {
  return (
    <St.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <St.Content>
        <Logo width={RFValue(118)} height={RFValue(12)} />
        {!isLoading && <St.Title>Total de {carQuantity} carros</St.Title>}
      </St.Content>
    </St.Container>
  );
}
