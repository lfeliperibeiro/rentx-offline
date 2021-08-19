import React, { useState } from 'react';
import { Container, Header, Title, Form, SubTitle, Footer } from './styles';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const { signIn } = useAuth();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation: NavigationProp<any> = useNavigation();
  async function handleSingIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obridatório')
          .email('Digite um email válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });
      await schema.validate({ email, password });
      Alert.alert('Tudo certo');
      signIn({ email, password });
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        Alert.alert('Opa', e.message);
      } else {
        Alert.alert('Erro na autenticação');
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior={'position'} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle={'dark-content'}
            translucent
            backgroundColor={'transparent'}
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName={'mail'}
              placeholder={'E-mail'}
              keyboardType={'email-address'}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName={'lock'}
              placeholder={'Senha'}
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title={'Login'}
              onPress={handleSingIn}
              enabled={true}
              loading={false}
            />
            <Button
              title={'Criar conta gratuita'}
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
