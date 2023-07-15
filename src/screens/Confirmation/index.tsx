import React from "react";
import * as St from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";
interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}
export const Confirmation = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
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
        <St.Title>{title}</St.Title>
        <St.Message>{message}</St.Message>
        <St.Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </St.Footer>
      </St.Content>
    </St.Container>
  );
};
