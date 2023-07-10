import React from "react";
import * as St from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Accessory from "../../components/Accessory";

import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Params {
  car: CarDTO;
}

export default function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  function handleBack() {
    navigation.goBack();
  }

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
            <St.Period>{car.rent.period}</St.Period>
            <St.Price>R$ {car.rent.price}</St.Price>
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

        <St.About>{car.about}</St.About>
      </St.Content>
      <St.Footer>
        <Button
          title={"Escolher período do aluguel"}
          onPress={handleConfirmRental}
        />
      </St.Footer>
    </St.Container>
  );
}
