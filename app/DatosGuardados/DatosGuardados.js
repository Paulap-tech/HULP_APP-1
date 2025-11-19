import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import { get } from '../apis';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Madrid'); //si quiero añadir el formato


const DatosGuardados = ({ route }) => {
  const { userEmail } = route.params;
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const responseSintomas = await get(`/sintomas/${userEmail}`);

        console.log('Síntomas:', responseSintomas.data);

        setDatos(responseSintomas.data);

      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [userEmail]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (datos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style= {styles.emptyText}>
          No hay datos registrados.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botonVolver2}
        >
          <Text style={styles.textoBotonVolver2}>Volver al perfil</Text>
        
        </TouchableOpacity>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos Registrados</Text>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.botonVolver}
        >
        <Text style= {styles.textoBotonVolver}> Volver al perfil</Text>
      </TouchableOpacity>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.fecha}
        renderItem={({ item }) => (
          <View style={styles.cardDia}>
            <Text style={styles.fechaTexto}>
              {dayjs.utc(item.fecha).format("YYYY-MM-DD")}
            </Text>

            {item.sintomas?.length > 0 ? (
              item.sintomas.map((s, idx) => (
                <Text key={idx} style={styles.sintomaTexto}>
                  .{s}
                </Text>
              ))
            ) : (
              <Text style={styles.sintomaTexto}>
                No hay síntomas registrados
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default DatosGuardados;
