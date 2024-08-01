import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Fondo gris claro
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Color de texto oscuro
    textAlign: 'center', // Alineación centrada para el título
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#E0E0E0', // Fondo gris claro para los botones
    borderRadius: 5,
    marginVertical: 5, // Espaciado vertical entre botones
    alignItems: 'center', // Alineación del texto
    justifyContent: 'center', // Justificación del texto
  },
  selectedButton: {
    backgroundColor: '#007bff', // Color azul para el botón seleccionado
  },
  optionText: {
    fontSize: 16, // Tamaño de la fuente
    color: '#333', // Color del texto
    fontWeight: 'bold', // Texto en negrita
  },
  selectedText: {
    color: '#fff', // Texto blanco para el botón seleccionado
  },
  symptomList: {
    paddingBottom: 80, // Espacio suficiente para el botón fijo
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row', // Alineación horizontal de los botones
    justifyContent: 'space-around', // Espacio entre los botones
    paddingHorizontal: 10, // Espaciado horizontal dentro del contenedor
  },
  clearButton: {
    backgroundColor: '#FF5733', // Color de fondo del botón "Limpiar"
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16, // Tamaño del texto
    fontWeight: 'bold',
  },
});

export default styles;
