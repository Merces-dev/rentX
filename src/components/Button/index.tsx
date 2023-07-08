import React from "react";
import * as St from "./styles";
import { BorderlessButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends BorderlessButtonProps {
  title: string;
  color?: string;
}

export default function Button({ title, color, ...rest }: ButtonProps) {
  return (
    <St.Container {...rest} color={color}>
      <St.Title>{title}</St.Title>
    </St.Container>
  );
}
