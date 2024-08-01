import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';

const UserInformation = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userEmail } = route.params || {};
    
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleSaveInformation = async () => {
    if (!weight || !height || !treatment) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || weightNum <= 0) {
      Alert.alert('Error', 'El peso debe ser un número positivo.');
      return;
    }

    if (isNaN(heightNum) || heightNum <= 0) {
      Alert.alert('Error', 'La talla debe ser un número positivo.');
      return;
    }

    if (!userEmail) {

      Alert.alert('Error', 'No se ha proporcionado un correo electrónico.');
      return;
    }

    try {
      const record = {
        email: userEmail,
        peso: weightNum,
        talla: heightNum,
        tratamiento: treatment,
      };

      const response = await axios.post('http://localhost:3000/information', record, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Información guardada:', response.data);
      navigation.navigate('Login'); // Redirigir a la pantalla de inicio de sesión
      Alert.alert('Éxito', 'Información guardada con éxito.');
      setWeight('');
      setHeight('');
      setTreatment('');
    } catch (error) {
      console.error('Error al guardar la información:', error);
      Alert.alert('Error', 'Error al guardar la información.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Información del usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        maxLength={5}
      />
      <TextInput
        style={styles.input}
        placeholder="Talla (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        maxLength={5}
      />
      <TextInput
        style={styles.input}
        placeholder="Tratamiento narcolepsia (opcional)"
        value={treatment}
        onChangeText={setTreatment}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveInformation}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserInformation;
