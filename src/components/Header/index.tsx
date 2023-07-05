import React from 'react'
import * as St from "./styles"
import Logo from "./../../assets/Logotipo.svg"
interface HeaderProps {
  carQuantity: number
}
export default function Header({ carQuantity }: HeaderProps) {
  return (
    <St.Container>
      <Logo />
      <St.Title>Total de {carQuantity} carros</St.Title>
    </St.Container>
  )
}

