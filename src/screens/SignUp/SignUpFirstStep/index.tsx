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
import { useNavigation } from '@react-navigation/native';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import * as Yup from 'yup';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driveLicense, setDriveLicense] = useState('');
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driveLicense: Yup.string().required('CNH obrigatória'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('Email obrigatório'),
        name: Yup.string().required('Nome obrigatório'),
      });
      const data = { name, email, driveLicense };
      await schema.validate(data);
      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        return Alert.alert('Opa', e.message);
      }
    }
    navigation.navigate('SignUpSecondStep');
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName={'user'}
              placeholder={'Nome'}
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName={'mail'}
              placeholder={'E-mail'}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName={'credit-card'}
              placeholder={'CNH'}
              keyboardType={'numeric'}
              onChangeText={setDriveLicense}
              value={driveLicense}
            />
          </Form>
          <Button title={'Próximo'} onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
