import React from "react";
import { Container, Header, Title, Form, SubTitle, Footer } from "./styles";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";

export function SignIn() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle={"dark-content"}
        translucent
        backgroundColor={"transparent"}
      />
      <Header>
        <Title>Estamos{"\n"}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{"\n"}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Form>
        <Input
          iconName={"mail"}
          placeholder={"E-mail"}
          keyboardType={"email-address"}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
        <InputPassword iconName={"lock"} placeholder={"Senha"} />
      </Form>
      <Footer>
        <Button
          title={"Login"}
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title={"Criar conta gratuita"}
          color={theme.colors.background_secondary}
          light
          onPress={() => {}}
          enabled={true}
          loading={false}
        />
      </Footer>
    </Container>
  );
}
