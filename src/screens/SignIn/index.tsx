import React, { useState } from "react";
import { Container, Header, Title, Form, SubTitle, Footer } from "./styles";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  return (
    <KeyboardAvoidingView behavior={"position"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName={"lock"}
              placeholder={"Senha"}
              onChangeText={setPassword}
              value={password}
            />
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
