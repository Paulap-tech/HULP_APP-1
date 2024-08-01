import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Color de fondo suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Color oscuro para buen contraste
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#00adf5', // Color del botón
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // Texto blanco para el botón
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 60,
    color: '#00adf5', // Color del ícono
    marginBottom: 20,
  }
});

export default styles;
