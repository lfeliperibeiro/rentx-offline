import React, { useState } from 'react';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { BackButton } from '../../../components/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Bullet } from '../../../components/Bullet';

import { Button } from '../../../components/Button';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { InputPassword } from '../../../components/InputPassword';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confimação');
    }
    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreen: 'SignIn',
          title: 'Conta Criada!',
          message: `Agora é só fazer login\ne aproveitar`,
        });
      })
      .catch((error) => {
        console.log(error);
        return Alert.alert('Opa', 'não foi possível cadastrar');
      });
  }

  return (
    <KeyboardAvoidingView behavior={'position'} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie sua {'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de {'\n'}forma rápida e fácil</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName={'lock'}
              placeholder={'Senha'}
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName={'lock'}
              placeholder={'Repetir senha'}
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title={'Cadastrar'}
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
