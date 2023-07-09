import React from "react";
import * as St from "./styles";
import { useTheme } from "styled-components";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";

export const SchedulingComplete = () => {
  const { width } = useWindowDimensions();
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
          Lorem ipsum dolor, sit {"\n"}
          amet consectetur adipisicing elit.{"\n"}
          Ipsa ut dignissimos neque
        </St.Message>
        <St.Footer>
          <ConfirmButton title="OK" />
        </St.Footer>
      </St.Content>
    </St.Container>
  );
};
