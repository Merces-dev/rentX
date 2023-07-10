import React from "react";
import * as St from "./styles";
import { SvgProps } from "react-native-svg";

interface AccessoryProps {
  name: string;
  icon: React.FC<SvgProps>;
}

export default function Accessory({ name, icon: Icon }: AccessoryProps) {
  return (
    <St.Container>
      <Icon width={32} height={32} />
      <St.Name>{name}</St.Name>
    </St.Container>
  );
}
