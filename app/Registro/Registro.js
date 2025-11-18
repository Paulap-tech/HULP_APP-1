import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
//import axios from 'axios';
import styles from './styles';
import { post } from '../apis';

// Componente de botón de opción
const OptionButton = React.memo(({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.selectedButton]}
    onPress={onPress}
  >
    <Text style={[styles.optionText, selected && styles.selectedText]}>{label}</Text>
  </TouchableOpacity>
));

// Componente principal RegistroEpisodios
const RegistroEpisodios = ({ userEmail, userAge }) => {
  useEffect(() => {
    console.log('Valor de userAge recibido:', userAge);
  }, [userAge]);

  const [form, setForm] = useState({
    tipoEvento: '',
    cataplejiaExtremidades: '',
    cataplejiaFacial: '',
    cataplejiaSuelo: '',
    suenoFragmentado: '',
    paralisisSuenio: '',
    alucinaciones: '',
    somnolencia: 0,
    somnolenciaScores: Array(8).fill(0)
  });

  const handleSelection = useCallback((field, value) => {
    setForm(prevForm => ({ ...prevForm, [field]: value }));
  }, []);

  const handleSomnolenciaScoreChange = (index, value) => {
    const newScores = [...form.somnolenciaScores];
    newScores[index] = value;
    const somnolencia = newScores.reduce((total, score) => total + score, 0);
    setForm(prevForm => ({ ...prevForm, somnolenciaScores: newScores, somnolencia }));
  };

  const handleReset = () => {
    setForm({
      tipoEvento: '',
      cataplejiaExtremidades: '',
      cataplejiaFacial: '',
      cataplejiaSuelo: '',
      suenoFragmentado: '',
      paralisisSuenio: '',
      alucinaciones: '',
      somnolencia: 0,
      somnolenciaScores: Array(8).fill(0)
    });
  };

  const handleSubmit = () => {
    const defaultForm = {
      cataplejiaExtremidades: form.cataplejiaExtremidades || 'no',
      cataplejiaFacial: form.cataplejiaFacial || 'no',
      cataplejiaSuelo: form.cataplejiaSuelo || 'no',
      suenoFragmentado: form.suenoFragmentado || 'no',
      paralisisSuenio: form.paralisisSuenio || 'no',
      alucinaciones: form.alucinaciones || 'no',
    };

    post('/registros', {
      fecha: new Date().toISOString().slice(0, 10),
      tipoEvento: form.tipoEvento,
      ...defaultForm,
      somnolencia: form.somnolencia,
      email: userEmail
    })
    .then(response => {
      console.log('Registro guardado con éxito:', response.data);
    })
    .catch(error => {
      console.error('Error al guardar el registro:', error);
    });
  };

  const tipoEventoOptions = [
    { label: 'Cataplejia', value: 'cataplejia' },
    { label: 'Sueño Fragmentado', value: 'suenoFragmentado' },
    { label: 'Parálisis del Sueño', value: 'paralisisSuenio' },
    { label: 'Somnolencia', value: 'somnolencia' },
    { label: 'Alucinaciones', value: 'alucinaciones' },
  ];

  const somnolenciaSituations = userAge >= 18 ? [
    'Sentado leyendo un periódico, una revista, un libro',
    'Viendo la televisión',
    'Sentado sin hacer nada en un lugar público (por ejemplo, un cine, una reunión familiar, una ceremonia religiosa)',
    'En el coche, como copiloto de un viaje de una hora sin parar',
    'Tumbado a media tarde',
    'Sentado hablando con alguien',
    'Sentado tranquilo después de una comida (sin alcohol)',
    'En un coche, si se para unos minutos por el tráfico'
  ] : [
    'Sentado leyendo',
    'Sentado viendo la televisión o video',
    'Sentado en una clase en la escuela por la mañana',
    'Sentado, como pasajero, en un coche o autobús durante unos 30 minutos',
    'Tumbado tranquilo a media tarde o siesta',
    'Sentado hablando con alguien',
    'Sentado tranquilo tras el almuerzo',
    'Sentado y comiendo'
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.question}>¿Qué tipo de evento quieres registrar?</Text>
        
        {tipoEventoOptions.map((item) => (
          <OptionButton
            key={item.value}
            label={item.label}
            selected={form.tipoEvento === item.value}
            onPress={() => handleSelection('tipoEvento', item.value)}
          />
        ))}
        {form.tipoEvento === 'somnolencia' && (
          <View style={styles.fieldContainer}>
            {somnolenciaSituations.map((situation, index) => (
              <View key={index} style={styles.somnolenciaContainer}>
                <Text style={styles.somnolenciaQuestion}>{`${index + 1}. ${situation}`}</Text>
                <View style={styles.optionsContainerHorizontal}>
                  {[0, 1, 2, 3].map(value => (
                    <TouchableOpacity
                      key={value}
                      style={[
                        styles.numberButton,
                        form.somnolenciaScores[index] === value && styles.selectedNumberButton
                      ]}
                      onPress={() => handleSomnolenciaScoreChange(index, value)}
                    >
                      <Text
                        style={[
                          styles.numberButtonText,
                          form.somnolenciaScores[index] === value && styles.selectedNumberButtonText
                        ]}
                      >
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.sliderText}>Seleccionado: {form.somnolenciaScores[index] || '-'}</Text>
              </View>
            ))}
            <Text style={styles.totalSomnolencia}>
              Puntuación total de somnolencia: {form.somnolencia}
            </Text>
          </View>
        )}

        {form.tipoEvento === 'cataplejia' && (
          <View style={styles.fieldContainer}>
            {['Extremidades', 'Facial', 'Suelo: caída al suelo'].map((type, index) => (
              <View key={index} style={styles.fieldContainer}>
                <Text style={styles.label}>Cataplejia {type}</Text>
                <View style={styles.optionsContainer}>
                  <OptionButton
                    label="Sí"
                    selected={form[`cataplejia${type}`] === 'si'}
                    onPress={() => handleSelection(`cataplejia${type}`, 'si')}
                  />
                  <OptionButton
                    label="No"
                    selected={form[`cataplejia${type}`] === 'no'}
                    onPress={() => handleSelection(`cataplejia${type}`, 'no')}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {['suenoFragmentado', 'paralisisSuenio', 'alucinaciones'].includes(form.tipoEvento) && (
          <View style={styles.fieldContainer}>
            <View style={styles.optionsContainer}>
              <OptionButton
                label="Sí"
                selected={form[form.tipoEvento] === 'si'}
                onPress={() => handleSelection(form.tipoEvento, 'si')}
              />
              <OptionButton
                label="No"
                selected={form[form.tipoEvento] === 'no'}
                onPress={() => handleSelection(form.tipoEvento, 'no')}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={handleSubmit}
          underlayColor="#0056b3" // Color de subrayado cuando el botón es presionado
        >
          <Text style={styles.buttonText}>Guardar Registro</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, { backgroundColor: '#f44336' }]} // Cambia el color del botón de limpiar
          onPress={handleReset}
          underlayColor="#d32f2f" // Color de subrayado cuando el botón es presionado
        >
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default RegistroEpisodios;
