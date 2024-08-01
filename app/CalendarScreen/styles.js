import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    flex: 1,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#00adf5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: width - 32, // Ajustar el ancho para mejor diseño
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  legend: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  legendText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 16,
  },
});

export default styles;
