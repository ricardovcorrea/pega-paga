import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import {TextInput, Button, BaseScreen, NavBarLogo} from '~/components/index';
import {validateEmail} from '~/general/helpers';
import {loginAction} from '~/redux/generalReducer';
import {login} from '~/services/authenticationService';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('321');

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
  };

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
      let errorMessage = 'An error has occured, try again!';

      if (error && error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Warning!', errorMessage);
    }
  };

  return (
    <BaseScreen scroll={true}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to continue</Text>

        <View style={styles.box}>
          <View>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              value={email}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                passwordField.focus();
              }}
              placeholder="user@email.com"
              isInvalid={emailError !== ''}
              hilightOnFocus={true}
              style={styles.field}
            />
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              value={password}
              returnKeyType={'done'}
              secureTextEntry={true}
              ref={input => {
                passwordField = input;
              }}
              onSubmitEditing={() => {
                loginButtonHandler();
              }}
              placeholder="********"
              isInvalid={passwordError !== ''}
              autoCapitalize={'words'}
              hilightOnFocus={true}
              style={styles.field}
            />
          </View>

          <Button
            style={styles.btnSave}
            onPress={() => {
              loginButtonHandler();
            }}
            title={'ENTER'}
            isLoading={isLoading}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('CreateAccount');
              }}>
              <Text
                style={[styles.fieldLabel, {fontSize: 25, marginBottom: 5}]}>
                Create account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.fieldLabel}>Forget password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseScreen>
  );
};

LoginScreen.navigationOptions = ({navigation}) => ({
  headerLeft: NavBarLogo,
});

export default LoginScreen;
