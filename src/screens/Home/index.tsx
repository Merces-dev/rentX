import React from 'react'
import * as St from "./styles"
import Header from '../../components/Header'

const Home = () => {
    return (
        <St.Container>
            <Header carQuantity={0}/>
            <St.Title>home</St.Title>
        </St.Container>
    )
}

export default Home
