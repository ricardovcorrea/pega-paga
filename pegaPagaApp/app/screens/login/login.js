import React, { useEffect, useState } from 'react';

import { View, TouchableOpacity, Text, Alert } from 'react-native';

import { validateEmail } from '../../general/helpers';

import { login } from '../../services/authentication';

import { TextInput, Button, BaseScreen } from '../../components';

import { useSelector, useDispatch } from 'react-redux';

import { loginAction } from '../../redux/generalReducer';

import styles from './styles';

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('admin@pegapaga.com.br');
  const [password, setPassword] = useState('123456');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  let passwordField = React.createRef();

  const inputsAreValid = () => {
    let areValid = true;

    if (!email) {
      setEmailError('Preencha este campo!');
      areValid = false;
    }

    if (email && !validateEmail(email)) {
      setEmailError('Digite um email válido!');
      areValid = false;
    }

    if (!password) {
      setPasswordError('Preencha este campo!');
      areValid = false;
    }

    return areValid;
  }

  const loginButtonHandler = async () => {

    if (isLoading || !inputsAreValid()) {
      return;
    }

    try {
      setIsLoading(true);

      dispatch(loginAction(email, password));
      await login(email, password);

      setIsLoading(false);

      props.navigation.navigate('Logged');

    } catch (error) {
      setIsLoading(false);

      let errorMessage = 'Ocorreu uma falha inesperada, tente novamente!';

      if (error && error.message && error.message.indexOf('401') > -1) {
        errorMessage = "Credenciais inválidas!";
      }

      Alert.alert('Atenção!', errorMessage);
    }

  }

  return (
    <BaseScreen scroll={true}>

      <View style={styles.container}>

        <Text style={styles.title}>Faça login para continuar</Text>

        <View style={styles.box}>

          <View>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              onChangeText={(text) => { setEmail(text); setEmailError(''); }}
              value={email}
              returnKeyType={'next'}
              onSubmitEditing={() => { passwordField.focus() }}
              placeholder="usuario@email.com.br"
              isInvalid={emailError != ''}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.fieldLabel}>Senha</Text>
            <TextInput
              onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
              value={password}
              returnKeyType={'done'}
              secureTextEntry={true}
              ref={input => { passwordField = input }}
              onSubmitEditing={() => { loginButtonHandler() }}
              placeholder="********"
              isInvalid={passwordError != ''}
              autoCapitalize={"words"}
            />
          </View>

          <Button style={styles.btnSave} onPress={() => { loginButtonHandler() }} title={'ENTRAR'} isLoading={isLoading} />

        </View>

      </View>
    </BaseScreen>

  );
}

LoginScreen.navigationOptions = ({ navigation }) => ({});

export default LoginScreen;

