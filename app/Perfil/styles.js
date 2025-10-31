import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f0fa',
  },
  header: {
    backgroundColor: '#00adf5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#66b2ff',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#cce0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 40,
    color: '#6699cc',
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#99ccff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#003366',
  },
  value: {
    fontSize: 16,
    color: '#004080',
    marginBottom: 10,
  },
  selectDoctorButton: {
    marginTop: 20,
    backgroundColor: '#3399ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectDoctorButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 250,
    backgroundColor: '#ec543fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f0fa',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#003366'
  },
  medicoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#99ccff',
  },
  medicoNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366'
  },
  medicoEspecialidad: {
    color: '#004080',
  },
  bloqueMedico: {
    backgroundColor: '#cce0ff',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBloqueMedico: {
    color: '#003366',
    fontWeight: 'bold',
  },
  datosButton: {
  backgroundColor: '#3399ff', 
  paddingVertical: 12,
  paddingHorizontal: 120,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 50,
  alignSelf: 'center',
},
datosButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},


});

export default styles;

