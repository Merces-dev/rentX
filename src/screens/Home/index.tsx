import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as St from "./styles";
import Header from "../../components/Header";
import Car from "../../components/Car";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

const Home = () => {
  const [isFetchingCars, setIsFetchingCars] = useState<boolean>(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const theme = useTheme();

  const navigation = useNavigation();
  
  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  function handleMyCars(car: CarDTO) {
    navigation.navigate("MyCars", { car });
  }

  async function fetchCars() {
    try {
      setIsFetchingCars(true);
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingCars(false);
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
            padding: 18,
          }}
          data={cars}
          keyExtractor={(item: CarDTO) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <St.MyCarsButton onPress={handleMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </St.MyCarsButton>
    </St.Container>
  );
};

export default Home;
