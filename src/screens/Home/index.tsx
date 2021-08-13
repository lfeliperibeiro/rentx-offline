import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import api from "../../services/api";
import { CarDTO } from "../../dtos/carDTO";
import { Ionicons } from "@expo/vector-icons";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { useTheme } from "styled-components";
import { LoadAnimation } from "../../components/LoadAnimation";

export function Home() {
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation: NavigationProp<any> = useNavigation();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
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
    async function fetchCar() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCar().then();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <Container>
      {Platform.OS === "ios" ? (
        <SafeAreaView style={{ backgroundColor: theme.colors.header }} />
      ) : null}
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
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
              name={"ios-car-sport"}
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
