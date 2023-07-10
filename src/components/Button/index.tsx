import React from "react";
import * as St from "./styles";
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

interface ButtonProps extends BorderlessButtonProps {
  title: string;
  color?: string;
  isEnabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  title,
  color,
  isEnabled = true,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <St.Container
      {...rest}
      color={color}
      enabled={isEnabled}
      style={{ opacity: isEnabled === false || isLoading === true ? 0.5 : 1 }}
    >
      {isLoading ? <ActivityIndicator /> : <St.Title>{title}</St.Title>}
    </St.Container>
  );
}
