import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { get } from '../apis';
import styles from './styles';

const PacienteDetalle = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const { pacienteEmail } = route.params;

  const [datos, setDatos] = useState(null);
  const [sintomas, setSintomas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Datos generales
        const infoResp = await get(`/paciente/${pacienteEmail}`);
        setDatos(infoResp.data);

        // Síntomas registrados anteriormente
        const sintomasResp = await get(`/sintomas/${pacienteEmail}`);
        setSintomas(sintomasResp.data || []);

      } catch (error) {
        console.log("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVolver}>
          <Text style= {styles.btnText}> Volver </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Información del Paciente</Text>

        <View style={styles.card}>
          <Text style={styles.item}>Correo: {datos.email}</Text>
          <Text style={styles.item}>Edad: {datos.age}</Text>
          <Text style={styles.item}>Peso: {datos.peso}</Text>
          <Text style={styles.item}>Talla: {datos.talla}</Text>
        </View>
        
        <Text style={styles.subtitle}>Síntomas Registrados</Text>

        {sintomas.length === 0 ? (
          <Text>No hay síntomas registrados.</Text>
        ) : (
          sintomas.map((s, index) => (
            <View key={index} style={styles.sintomaBox}>
              <Text style={styles.sintomaText}>• {s.descripcion}</Text>
              <Text style={styles.fecha}>Fecha: {s.fecha}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};



export default PacienteDetalle;
