import React from "react";
import * as St from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  title: string;
}

export const ConfirmButton = ({ title, ...rest }: ButtonProps) => {
  return (
    <St.Container {...rest}>
      <St.Title>{title}</St.Title>
    </St.Container>
  );
};
