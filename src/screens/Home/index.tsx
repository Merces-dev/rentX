import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as St from "./styles";
import Header from "../../components/Header";
import Car from "../../components/Car";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

const Home = () => {
  const [isFetchingCars, setIsFetchingCards] = useState<boolean>(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const navigation = useNavigation();
  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  async function fetchCars() {
    try {
      setIsFetchingCards(true);
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingCards(false);
    }
  }
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <St.Container>
      <Header carQuantity={cars.length} />
      {isFetchingCars ? (
        <Load />
      ) : (
        <St.CarList
          contentContainerStyle={{
            padding: 18
          }}
          data={cars}
          keyExtractor={(item: CarDTO) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </St.Container>
  );
};

export default Home;
