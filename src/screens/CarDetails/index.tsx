import React from "react";
import * as St from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Accessory from "../../components/Accessory";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";
import Button from "../../components/Button";

export default function CarDetails() {
  return (
    <St.Container>
      <St.Header>
        <BackButton onPress={() => {}} />
      </St.Header>
      <St.CarImages>
        <ImageSlider
          imagesUrl={[
            "https://ik.imagekit.io/2ero5nzbxo2/tr:di-placeholder.png,q-70,w-375,q-70/FILES/generations/WO5Gkl0APWC44FnH5HDZcL7OwmXmnqdyXF8PN84n.png?ik-sdk-version=php-2.0.0",
            "https://ik.imagekit.io/2ero5nzbxo2/tr:di-placeholder.png,q-70,w-375,q-70/FILES/generations/WO5Gkl0APWC44FnH5HDZcL7OwmXmnqdyXF8PN84n.png?ik-sdk-version=php-2.0.0",
          ]}
        />
      </St.CarImages>
      <St.Content>
        <St.Details>
          <St.Description>
            <St.Brand>Lamborghini</St.Brand>
            <St.Name>Huracan</St.Name>
          </St.Description>
          <St.Rent>
            <St.Period>Ao dia</St.Period>
            <St.Price>R$ 580</St.Price>
          </St.Rent>
        </St.Details>
        <St.Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </St.Accessories>

        <St.About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quisquam
          aspernatur nisi rem quasi hic temporibus ni
        </St.About>
      </St.Content>
      <St.Footer>
        <Button title={"Confirmmar"}/>
      </St.Footer>
    </St.Container>
  );
}
