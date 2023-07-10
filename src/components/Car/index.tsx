import React from "react";
import * as St from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Props extends RectButtonProps {
  data: CarDTO;
}

export default function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  return (
    <St.Container {...rest}>
      <St.Details>
        <St.Brand>{data.brand}</St.Brand>
        <St.Name>{data.name}</St.Name>
        <St.About>
          <St.Rent>
            <St.Period>{data.rent.period}</St.Period>
            <St.Price>R$ {data.rent.price}</St.Price>
          </St.Rent>
          <St.Type>
            <MotorIcon />
          </St.Type>
        </St.About>
      </St.Details>
      <St.CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </St.Container>
  );
}
