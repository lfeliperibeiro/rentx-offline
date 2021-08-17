import React from "react";
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { BackButton } from "../../../components/BackButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";

import { Button } from "../../../components/Button";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { InputPassword } from "../../../components/InputPassword";
import { useTheme } from "styled-components";

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation: NavigationProp<any> = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior={"position"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie sua {"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de {"\n"}forma rápida e fácil</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword iconName={"lock"} placeholder={"Senha"} />
            <InputPassword iconName={"lock"} placeholder={"Repetir senha"} />
          </Form>
          <Button title={"Cadastrar"} color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
