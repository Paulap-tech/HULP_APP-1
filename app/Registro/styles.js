import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo gris claro
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 80, // Espacio para el botón fijo
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20, // Aumentado para separar mejor de los elementos
  },
  optionsContainerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribuir espacio entre botones
    flexWrap: 'wrap', // Permitir que los botones se envuelvan si no caben en una sola línea
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#E0E0E0', // Fondo gris claro para los botones
    borderRadius: 5,
    marginHorizontal: 5, // Espaciado horizontal entre botones
    marginVertical: 5, // Espaciado vertical entre botones
  },
  selectedButton: {
    backgroundColor: '#00adf5', // Color de selección azul
  },
  optionText: {
    fontSize: 18, // Aumentar tamaño de la fuente para mayor claridad
    fontWeight: 'bold', // Texto en negrita
    color: '#333', // Color del texto
  },
  selectedText: {
    color: '#fff', // Texto blanco para el botón seleccionado
  },
  fieldContainer: {
    marginVertical: 10, // Aumentar el espaciado vertical entre secciones
  },
  label: {
    fontSize: 18, // Tamaño de fuente para etiquetas
    fontStyle: 'italic', // Texto en cursiva
    marginBottom: 10, // Espaciado debajo de la etiqueta
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '110%',
    justifyContent: 'space-evenly', // Ajustar espacio entre opciones
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  somnolenciaContainer: {
    marginBottom: 30, // Aumentar el espaciado entre bloques
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Línea de separación
  },
  somnolenciaQuestion: {
    fontSize: 16,
    marginBottom: 10, // Espaciado debajo de la pregunta
    fontWeight: 'bold',
  },
  totalSomnolencia: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '110%', // Cambiado de '110%' a '100%' para ajuste más preciso
    paddingHorizontal: 20,
    paddingBottom: 20, // Espacio para el botón
    backgroundColor: '#F5F5F5',
    flexDirection: 'row', // Alinear botones en fila
    justifyContent: 'space-between', // Espacio entre botones
  },
  button: {
    width: 140, // Ancho del botón
    height: 60, // Alto del botón
    backgroundColor: '#007bff', // Color azul
    borderRadius: 4, // Esquinas redondeadas
    justifyContent: 'center', // Centrar el texto verticalmente
    alignItems: 'center', // Centrar el texto horizontalmente
  },
  buttonText: {
    color: '#fff', // Color del texto en blanco
    fontSize: 16, // Tamaño del texto
    textAlign: 'center', // Centrar el texto dentro del botón
  },
});

export default styles;
