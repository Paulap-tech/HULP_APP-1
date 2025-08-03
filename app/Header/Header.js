import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { AuthContext } from '../context/AuthContext';

const Header = ({ email }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>¡Hola {email}!</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#00adf5', // Cambiar el color de fondo a un azul más suave
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Agregar una línea de separación sutil en la parte inferior
  },
  headerText: {
    color: '#fff',
    fontSize: 20, // Ajustar el tamaño del texto para una mejor visibilidad
    fontWeight: '600', // Usar un peso de fuente ligeramente más ligero
    marginBottom:8,
  } 
});

export default Header;
