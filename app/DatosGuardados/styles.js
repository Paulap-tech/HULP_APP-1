import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffe4e1', 
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: '#ffc0cb',
    borderWidth: 1,
  },
  fecha: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  botonVolver: {
  backgroundColor: '#007bff',
  padding: 10,
  borderRadius: 8,
  alignSelf: 'center',
  marginBottom: 15,
},
botonVolver2: {
  backgroundColor: '#007bff',
  padding: 10,
  borderRadius: 8,
  alignSelf: 'center',
  marginBottom: 15,
  marginTop: 20,
},

textoBotonVolver2: {
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
},
textoBotonVolver: {
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
},
emptyContainer: {
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: 'center',
  },


});

export default styles;
