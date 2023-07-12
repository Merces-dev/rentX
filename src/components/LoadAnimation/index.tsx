import React from "react";
import * as St from "./styles";
import loadCar from "../../assets/load_car.json";
import LottieView from "lottie-react-native";

export function LoadAnimation() {
  return (
    <St.Container>
      <LottieView
        source={loadCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </St.Container>
  );
}
