import React from "react";
import * as St from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { BorderlessButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends BorderlessButtonProps {
  title: string;
  color?: string;
  // onPress: () => void;
}

export default function Button({ title, color, ...rest }: ButtonProps) {
  const theme = useTheme();
  return (
    <St.Container {...rest}>
      <St.Title>{title}</St.Title>
    </St.Container>
  );
}
