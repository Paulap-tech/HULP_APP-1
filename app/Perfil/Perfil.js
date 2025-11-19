import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, FlatList, ActivityIndicator, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { get , post, put } from '../apis';
import { useNavigation } from '@react-navigation/native';

const Perfil = ({ userEmail, userAge, setIsAuthenticated }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [loadingMedicos, setLoadingMedicos] = useState(false);
  const [medicoSeleccionado, setMedicoSeleccionado ] = useState(null);
  const [userRole, setUserRole ] = useState(null);
  const navigation = useNavigation();

  const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(false);


  useEffect(() => {
  const loadUserData = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(`profileImage_${userEmail}`);
      if (savedImage) setProfileImage(savedImage);

      const response =await get(`/medico-asignado/${userEmail}`);
      if (response.data && response.data.medicoEmail) {
        setMedicoSeleccionado(response.data.medicoEmail);
      }
    } catch (error) {
      console.log('Error al cargar datos del usuario:', error);
    }
  };

  loadUserData();
}, [userEmail]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await get(`/usuario/${userEmail}`); // Asegúrate de tener este endpoint en tu backend
        if (response.data && response.data.role) {
          setUserRole(response.data.role);
          console.log('Rol del usuario:', response.data.role);

          if (response.data.role === 'medico'){
            fetchSolicitudesPendientes(response.data.role, userEmail);
          }
        } else {
          console.log('No se encontró el rol del usuario');
        }
      } catch (error) {
        console.log('Error al obtener rol del usuario:', error);
      }
    };

    fetchUserRole();
  }, [userEmail]);

  const fetchMedicos = async () => {
    setLoadingMedicos(true);
    try {
      const response = await get('/medicos'); 
      console.log('Lista de médicos:', response.data);
      setMedicos(response.data);
    } catch (error) {
      console.log('Error al cargar médicos:', error);
      Alert.alert('Error', 'No se pudo cargar la lista de médicos');
    }
    setLoadingMedicos(false);
  };

  const fetchSolicitudesPendientes = async (role, email) => {
    setLoadingSolicitudes(true);
    try {
      const response = await get(`/solicitudes/${email}`);
      setSolicitudesPendientes(response.data || []);
    } catch (error) {
      console.log('Error al cargar solicitudes pendientes:', error);
    }
    setLoadingSolicitudes(false);
  };

  const gestionarSolicitud = async (solicitudId, accion) => {
    try {
      const aceptar = accion === 'aceptar';
      const response = await post('/solicitudes/responder',{
        solicitudId,
        aceptar
      });
      if (response.status === 200) {
        Alert.alert('Éxito', response.data.message);
        fetchSolicitudesPendientes(userRole, userEmail); // refresca lista
      }
    } catch (error) {
      console.log('Error al gestionar solicitud:', error);
      Alert.alert('Error', 'No se pudo actualizar la solicitud');
    }
  };

  const seleccionarMedico = async (medicoId) => {
    try {
      //const pacienteId = userEmail; // ejemplo simple con email como id

      const response = await post('/solicitudes', { pacienteEmail: userEmail, medicoEmail: medicoId });

      if (response.status === 201 || response.data.success) {
        Alert.alert('Solicitud enviada', 'Tú solicitud ha sido enviada al médico. Espera su respuesta.');
        //setMedicoSeleccionado(medicoId);
        //await AsyncStorage.setItem(`medicoSeleccionado_${userEmail}`, medicoId);
        setModalVisible(false);
      } else {
        Alert.alert('Error', 'No se pudo enviar la solicitud.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al conectar con el servidor');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      try {
        await AsyncStorage.setItem(`profileImage_${userEmail}`, uri);
      } catch (error) {
        console.log('Error guardando imagen de perfil:', error);
      }
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirmar cierre de sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userEmail', 'userAge']);
      setIsAuthenticated(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleVerDatos = () => {
    navigation.navigate('DatosGuardados', { userEmail });
  };


return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>

      {/* SALUDO */}
      <Text style={styles.saludo}>¡bienvenido!</Text>

      {/* TARJETA DE PERFIL */}
      <View style={styles.cardPerfil}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>+</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoUser}>
          <Text style={styles.infoText}>Correo: <Text style={styles.infoBold}>{userEmail}</Text></Text>
          <Text style={styles.infoText}>Edad: {userAge}</Text>
          {medicoSeleccionado && (
            <Text style={styles.infoText}>
              Mi médico: {medicoSeleccionado}
            </Text>
          )}
        </View>
      </View>

      {/* BOTONES */}
      {userRole === 'paciente' && (
        <>
          <TouchableOpacity style={styles.boton} onPress={handleVerDatos}>
            <Text style={styles.botonTexto}>Mis datos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => {
              fetchMedicos();
              setModalVisible(true);
            }}
          >
            <Text style={styles.botonTexto}>Seleccionar médico</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.botonCerrar} onPress={confirmLogout}>
        <Text style={styles.botonTextoCerrar}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona tu médico</Text>

          {loadingMedicos ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={medicos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.medicoItem}
                  onPress={() => seleccionarMedico(item.id)}
                >
                  <Text style={styles.medicoNombre}>{item.id}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

    </View>
  </ScrollView>
);



};

export default Perfil;



