import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import { get } from '../apis';

const ListaPacientes = ({ userEmail }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const response = await get(`/medico/${userEmail}/pacientes`);
        console.log('Respuesta pacientes:', response.data);
        setPacientes(response.data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPacientes();
  }, [userEmail]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (pacientes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay pacientes asignados.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes Asignados</Text>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Email: {item.email}</Text>
            <Text>Edad: {item.age}</Text>
            <Text>Peso: {item.peso}</Text>
            <Text>Talla: {item.talla}</Text>
            <Text>Tratamiento: {item.tratamiento}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListaPacientes;

