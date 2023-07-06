import React from 'react'
import * as St from "./styles"
import Header from '../../components/Header'
import Car from '../../components/Car'

const Home = () => {
    const carData = [{
        brand: 'audi',
        name: 'RS 5 Coupe',
        rent: {
            period: 'ao dia',
            price: 120
        },
        thumbnail: 'https://ik.imagekit.io/2ero5nzbxo2/tr:di-placeholder.png,q-70,w-375,q-70/FILES/generations/WO5Gkl0APWC44FnH5HDZcL7OwmXmnqdyXF8PN84n.png?ik-sdk-version=php-2.0.0'
    }]
    return (
        <St.Container>
            <Header carQuantity={0} />
            <St.CarList
                data={[1, 2, 3, 4, 5, 6, 7]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={carData[0]} />}
            />
        </St.Container>
    )
}

export default Home
