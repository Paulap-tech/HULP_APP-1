import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; // Importa los estilos desde un archivo separado
import { post } from '../apis';

const LoginScreen = ({ navigation, setIsAuthenticated, setUserInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await post('/login', { email, password });
      const { email: userEmail, age: userAge, token, role: userRole } = response.data;

      await AsyncStorage.setItem('userToken', token || 'dummy-token');
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('userAge', userAge.toString());
      await AsyncStorage.setItem('userRole' , userRole);

      // Actualizar estado global para mostrar MainTabs
      setUserInfo({ email: userEmail, userAge, role: userRole });
      setIsAuthenticated(true);

      // No navegamos manualmente aquí porque el stack cambia automáticamente

    } catch (error) {
      console.error('Error en el login:', error);

      if (error.response) {
        if (error.response.status === 401) {
          setError('Email o contraseña incorrectos. Por favor, verifica tus datos.');
        } else {
          setError('Error interno. Por favor, inténtalo de nuevo más tarde.');
        }
      } else {
        setError('Error de red. Por favor, verifica tu conexión a internet.');
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Regístrate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;
