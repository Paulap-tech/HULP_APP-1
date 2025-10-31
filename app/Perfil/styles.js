import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ffe4e1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
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
    borderColor: '#ccc',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 40,
    color: '#888',
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#d0e8ff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#1a1a1a',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  selectDoctorButton: {
    marginTop: 20,
    backgroundColor: '#ffe4e1',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectDoctorButtonText: {
    color: '#150408ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  medicoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  medicoNombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  medicoEspecialidad: {
    color: 'gray',
  },
  bloqueMedico: {
    backgroundColor: '#c8f7c5',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBloqueMedico: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  datosButton: {
  backgroundColor: '#ff69b4', // Rosa
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 20,
  alignSelf: 'center',
},
datosButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},


});

export default styles;

