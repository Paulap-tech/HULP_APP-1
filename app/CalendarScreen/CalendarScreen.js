import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
//import axios from 'axios';
import styles from './styles'; 
import { post, get } from '../apis';

const CalendarScreen = ({ userEmail }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [cycleDays, setCycleDays] = useState(28); // Valor por defecto si no se encuentra el ciclo

  useEffect(() => {
    if (!userEmail) {
      Alert.alert('Error', 'No se ha proporcionado el correo electrónico del usuario.');
      return;
    }

    fetchMenstruationDates();
    fetchUserCycleDays();
  }, [userEmail]);

  const adjustDateForTimezone = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1); // Ajuste de zona horaria si es necesario
    return adjustedDate;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Solo YYYY-MM-DD
  };

  const calculateFertileDays = (startDate, cycleDays) => {
    const fertileDays = [];
    const ovulationDay = new Date(startDate);
    ovulationDay.setDate(startDate.getDate() + (cycleDays - 14)); // Aproximadamente 14 días antes del final del ciclo

    // Los días fértiles son 3 días antes y 3 días después de la ovulación
    for (let i = -3; i <= 3; i++) {
      const fertileDay = new Date(ovulationDay);
      fertileDay.setDate(ovulationDay.getDate() + i);
      fertileDays.push(formatDate(fertileDay));
    }

    return fertileDays;
  };

  const fetchMenstruationDates = () => {
    get(`/registros/fechas/${userEmail}`)
      .then(response => {
        const fetchedDates = response.data;
        const newMarkedDates = {};

        fetchedDates.forEach(date => {
          if (date.fase === 'menstruacion') { // Solo marcar fechas de menstruación
            const startDate = new Date(date.fecha_inicio);
            startDate.setUTCHours(0, 0, 0, 0);

            const endDate = new Date(date.fecha_fin);
            endDate.setUTCHours(23, 59, 59, 999);

            // Ajustar fechas para tener en cuenta la zona horaria
            const adjustedStartDate = adjustDateForTimezone(startDate);
            const adjustedEndDate = adjustDateForTimezone(endDate);

            let currentDate = new Date(adjustedStartDate);

            while (currentDate <= adjustedEndDate) {
              const formattedDate = formatDate(currentDate);
              newMarkedDates[formattedDate] = {
                customStyles: {
                  container: {
                    borderColor: '#FF9999',
                    borderWidth: 2,
                    borderRadius: 8,
                  },
                  text: { color: '#FF9999' }
                }
              };
              currentDate.setDate(currentDate.getDate() + 1);
            }

            // Marcar los días fértiles basados en la fecha de inicio de la menstruación
            const fertileDays = calculateFertileDays(startDate, cycleDays);
            fertileDays.forEach(date => {
              newMarkedDates[date] = {
                customStyles: {
                  container: {
                    backgroundColor: '#77DD77', // Verde pastel para los días fértiles
                    borderRadius: 8,
                  },
                  text: { color: '#FFFFFF' } // Texto blanco para mejor contraste
                }
              };
            });
          }
        });

        // Marcar los días recomendados para concebir
        const { recommendedStartDate, recommendedEndDate } = calculateConceptionRange();
        let currentDate = new Date(recommendedStartDate);

        while (currentDate <= recommendedEndDate) {
          const formattedDate = formatDate(currentDate);
          newMarkedDates[formattedDate] = {
            customStyles: {
              container: {
                backgroundColor: '#FFD700', // Amarillo para los días recomendados
                borderRadius: 8,
              },
              text: { color: '#000000' }
            }
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setMarkedDates(newMarkedDates);
      })
      .catch(error => {
        console.error('Error al obtener las fechas marcadas:', error);
      });
  };

  const fetchUserCycleDays = () => {
    get(`/ciclo/${userEmail}`)
      .then(response => {
        const { cicle_days } = response.data;
        setCycleDays(cicle_days || 28); // Valor por defecto si no se encuentra el número de días del ciclo
      })
      .catch(error => {
        console.error('Error al obtener los días del ciclo:', error);
      });
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    
    if (!selectedStartDate) {
      setSelectedStartDate(dateString);
    } else if (!selectedEndDate && dateString > selectedStartDate) {
      setSelectedEndDate(dateString);
    } else if (dateString < selectedStartDate) {
      setSelectedStartDate(dateString);
      setSelectedEndDate('');
    }
  };

  const calculateLutealPhase = (startDate) => {
    const menstruationStartDate = new Date(startDate);
    const lutealPhaseStart = new Date(menstruationStartDate);
    lutealPhaseStart.setDate(menstruationStartDate.getDate() + (cycleDays / 2));

    const lutealPhaseEnd = new Date(menstruationStartDate);
    lutealPhaseEnd.setDate(menstruationStartDate.getDate() + cycleDays);

    return { lutealPhaseStart: formatDate(lutealPhaseStart), lutealPhaseEnd: formatDate(lutealPhaseEnd) };
  };

  const calculateConceptionRange = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + 7); // Comenzar en el día 7 del ciclo
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 20); // Terminar en el día 20 del ciclo

    return { recommendedStartDate: formatDate(startDate), recommendedEndDate: formatDate(endDate) };
  };

  const handleSaveMenstruationDates = () => {
    if (!selectedStartDate || !selectedEndDate) {
      Alert.alert('Selecciona las fechas de inicio y fin de menstruación');
      return;
    }

    const { lutealPhaseStart, lutealPhaseEnd } = calculateLutealPhase(selectedStartDate);

    const menstruationRecord = {
      email: userEmail,
      fecha_inicio: selectedStartDate,
      fecha_fin: selectedEndDate,
      fase: 'menstruacion'
    };

    post('/menstruacion', menstruationRecord, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Fechas de menstruación guardadas:', response.data);

      // Guardar fase lútea, pero no marcarla en el calendario
      const lutealRecord = {
        email: userEmail,
        fecha_inicio: lutealPhaseStart,
        fecha_fin: lutealPhaseEnd,
        fase: 'lútea'
      };

      post('/fases', lutealRecord, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log('Fase lútea guardada:', response.data);
        fetchMenstruationDates(); // Marca solo las fechas de menstruación y los días fértiles en el calendario
        setSelectedStartDate('');
        setSelectedEndDate('');
      })
      .catch(error => {
        console.error('Error al guardar la fase lútea:', error);
        Alert.alert('Error', 'No se pudo guardar la fase lútea');
      });
    })
    .catch(error => {
      console.error('Error al guardar las fechas de menstruación:', error);
      Alert.alert('Error', 'No se pudo guardar las fechas de menstruación');
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            markingType={'custom'}
            locale={'es'} // Configurar el calendario en español
            firstDay={1} // El calendario comienza el lunes
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#3366FF',
              selectedDotColor: '#ffffff',
              arrowColor: '#00adf5',
              monthTextColor: '#00adf5',
              indicatorColor: '#00adf5',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleSaveMenstruationDates}>
        <Text style={styles.buttonText}>Guardar días de menstruación</Text>
      </TouchableOpacity>

      <View style={styles.legend}>
        <Text style={styles.legendText}>Leyenda:</Text>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { borderColor: '#FF9999', borderWidth: 2 }]} />
          <Text style={styles.legendLabel}>Menstruación</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#77DD77', borderWidth: 0 }]} />
          <Text style={styles.legendLabel}>Días fértiles</Text>
        </View>
      </View>
    </View>
  );
};

export default CalendarScreen;
