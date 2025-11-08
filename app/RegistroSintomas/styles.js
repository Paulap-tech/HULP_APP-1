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

    backgroundColor: '#E0E0E0',     // gris claro por defecto
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,               // bordes redondeados tipo "pill"
    marginVertical: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,                   // sombra para Android
    shadowColor: '#000',            // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
   
  },
  selectedButton: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3', // Color azul para el botón seleccionado
  },
  optionText: {
    fontSize: 16, // Tamaño de la fuente
    color: '#333', // Color del texto
    fontWeight: '500', // Texto en negrita
  },
  selectedText: {
    color: '#fff', // Texto blanco para el botón seleccionado
    fontWeight: '600',
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
