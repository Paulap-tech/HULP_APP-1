import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
//import axios from 'axios';
import styles from './styles';
import { post } from '../apis';

const DayPeriod = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userEmail, role } = route.params || {}; // Obtener el correo electrónico de los parámetros
  const [cycleDuration, setCycleDuration] = useState('');

  React.useEffect(() => {
    if (role !== 'paciente') {
      navigation.replace('PersonalInfo', {userEmail});
    }
  }, [role]);
  if (role !== 'paciente') return null;

  const handleSaveCycleDuration = async () => {
    if (!cycleDuration) {
      Alert.alert('Error', 'Por favor, ingresa la duración de tus ciclos menstruales.');
      return;
    }

    const duration = parseInt(cycleDuration, 10);
    if (isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'La duración debe ser un número positivo.');
      return;
    }

    try {
      const record = {
        email: userEmail,
        ciclo_duracion: duration,
      };

      const response = await post('/ciclo-duracion', record, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Duración del ciclo guardada:', response.data);
      console.log('userEmail en DayPeriod:', userEmail);

      navigation.navigate('PersonalInfo', { userEmail, role}) // Redirigir a la pantalla de información personal clínica
      Alert.alert('Éxito', 'Duración del ciclo guardada con éxito.');
      setCycleDuration('');
    } catch (error) {
      console.error('Error al guardar la duración del ciclo:', error);
      Alert.alert('Error', 'Error al guardar la duración del ciclo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¿Cuánto te suelen durar los ciclos?</Text>
      <TextInput
        style={styles.input}
        placeholder="Duración en días"
        value={cycleDuration}
        onChangeText={setCycleDuration}
        keyboardType="numeric"
        maxLength={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveCycleDuration}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DayPeriod;
