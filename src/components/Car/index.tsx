import React from 'react'
import * as St from "./styles"
import GasolineSvg from "./../../assets/gasoline.svg"

interface CarProps {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    };
    thumbnail: string;
}
interface Props {
    data: CarProps
}
export default function Car({ data }: Props) {
    return (
        <St.Container>
            <St.Details>
                <St.Brand>{data.brand}</St.Brand>
                <St.Name>{data.name}</St.Name>
                <St.About>
                    <St.Rent>
                        <St.Period>{data.rent.period}</St.Period>
                        <St.Price>R$ {data.rent.price}</St.Price>
                    </St.Rent>
                    <St.Type>
                        <GasolineSvg />
                    </St.Type>
                </St.About>
            </St.Details>
            <St.CarImage
                source={{ uri: data.thumbnail }}
                resizeMode="contain"
            />
        </St.Container>
    )
}
