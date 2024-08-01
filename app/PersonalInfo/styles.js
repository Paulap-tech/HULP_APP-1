import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    width: width - 40, // Ajustar el ancho para mejor diseño
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#00adf5',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: width - 40,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  registerButton: {
    borderColor: '#00adf5',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: width - 40,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff', // Fondo blanco para el botón de registro
  },
  registerButtonText: {
    color: '#00adf5',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
