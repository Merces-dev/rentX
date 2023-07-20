import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as St from "./styles";
import Header from "../../components/Header";
import Car from "../../components/Car";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { LoadAnimation } from "../../components/LoadAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

const Home = () => {
  const [isFetchingCars, setIsFetchingCars] = useState<boolean>(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const theme = useTheme();
  const navigation = useNavigation();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  function handleMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        if (isMounted) setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setIsFetchingCars(false);
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <St.Container>
      <Header carQuantity={cars.length} isLoading={isFetchingCars} />
      {isFetchingCars ? (
        <LoadAnimation />
      ) : (
        <St.CarList
          contentContainerStyle={{
            padding: 18,
          }}
          data={cars}
          keyExtractor={(item: CarDTO) => item.id}
          renderItem={({ item }: { item: CarDTO }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            onPress={handleMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.background_primary}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </St.Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
