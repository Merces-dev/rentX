import React from "react";
import * as St from "./styles";
interface Props {
  active?: boolean;
}
export const Bullet = ({ active = false}: Props) => {
  return <St.Container active={active} />;
};
