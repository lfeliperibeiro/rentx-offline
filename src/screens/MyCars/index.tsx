import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CarDTO } from "../../dtos/carDTO";
import api from "../../services/api";
import { FlatList, StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  FooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { LoadAnimation } from "../../components/LoadAnimation";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation: NavigationProp<any> = useNavigation();
  function handleBack() {
    navigation.goBack();
  }
  const theme = useTheme();
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCars().then();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={"transparent"}
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Seus agendamentos, {"\n"}
          estão aqui
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <FooterTitle>Período</FooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name={"arrowright"}
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
