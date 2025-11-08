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
   backgroundColor: '#E0E0E0',     // gris claro por defecto
   paddingVertical: 12,
   paddingHorizontal: 20,
   borderRadius: 25,               // más redondeado tipo "pill"
   marginVertical: 8,
   marginHorizontal: 6,
   alignItems: 'center',
   justifyContent: 'center',
   elevation: 2,                   // sombra en Android
   shadowColor: '#000',            // sombra en iOS
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 3,
   borderWidth: 1,
   borderColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: '#00adf5', // Color de selección azul
    borderColor: '#0056b3'
  },
  optionText: {
    fontSize: 16, // Aumentar tamaño de la fuente para mayor claridad
    fontWeight: '500', // Texto en negrita
    color: '#333', // Color del texto
  },
  selectedText: {
    color: '#fff', // Texto blanco para el botón seleccionado
    fontWeight:'600',
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
  numberButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedNumberButton: {
    backgroundColor: '#00adf5',
    borderColor: '#0077cc',
  },
  numberButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedNumberButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

});

export default styles;
