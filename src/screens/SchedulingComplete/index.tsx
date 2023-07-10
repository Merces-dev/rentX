import React from "react";
import * as St from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";

export const SchedulingComplete = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  function handleConfirm() {
    navigation.navigate("Home");
  }
  return (
    <St.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />
      <St.Content>
        <DoneSvg width={80} height={80} />
        <St.Title>Carro alugado!</St.Title>
        <St.Message>
          Agora você só precisa ir{"\n"}
          até a concessionária da RENTX{"\n"}
          pegar o seu automóvel
        </St.Message>
        <St.Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </St.Footer>
      </St.Content>
    </St.Container>
  );
};
