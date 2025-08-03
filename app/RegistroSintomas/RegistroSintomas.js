import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from './styles'; // Importa los estilos desde un archivo separado
import { post } from '../apis';

const sintomasGenerales = [
  'Dolor de Cabeza',
  'Dolor Lumbar',
  'Dolor Pélvico',
  'Dolor Abdominal',
  'Fatiga',
  'Cansancio',
  'Náuseas',
  'Mareos',
  'Insomnio',
  'Estrés',
  'Irritabilidad',
  'Sudoración',
  'Dolor en el Pecho',
  'Dificultad para Respirar'
];

const RegistroSintomas = ({ userEmail, navigation }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const today = new Date().toISOString().slice(0, 10); // Obtener la fecha actual en formato YYYY-MM-DD

  useEffect(() => {
    // Resetear el estado cuando el componente se monte
    setSelectedSymptoms({});
  }, []);

  const handleSelectSymptom = async (symptom) => {
    const newSelectedSymptoms = {
      ...selectedSymptoms,
      [symptom]: !selectedSymptoms[symptom] // Toggle selection
    };
    setSelectedSymptoms(newSelectedSymptoms);

    try {
      await post('/sintomas', {
        email: userEmail,
        fecha: today,
        symptoms: Object.keys(newSelectedSymptoms).filter(symptom => newSelectedSymptoms[symptom])
      });
      // Puedes añadir una alerta o algún mensaje aquí si deseas
    } catch (error) {
      console.error('Error al guardar síntomas:', error);
      // Puedes añadir una alerta o algún mensaje aquí si deseas
    }
  };

  const handleClearSelection = () => {
    setSelectedSymptoms({});
  };

  const renderSymptomItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedSymptoms[item] && styles.selectedButton
      ]}
      onPress={() => handleSelectSymptom(item)}
    >
      <Text style={[
        styles.optionText,
        selectedSymptoms[item] && styles.selectedText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Síntomas para el {today}</Text>
      <FlatList
        data={sintomasGenerales}
        renderItem={renderSymptomItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.symptomList}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearSelection}
        >
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegistroSintomas;
