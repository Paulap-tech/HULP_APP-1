import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener instalado react-native-vector-icons
import styles from './styles'; // Importa los estilos desde un archivo separado

const WelcomeScreen = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
     
      <Icon name="smile-o" style={styles.icon} /> 
      <Text style={styles.title}>
        ¡Bienvenido a la app del servicio de neurología del HULP!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
