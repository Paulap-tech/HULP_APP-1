import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
//import { registerUser } from './apis';
import styles from './styles';
import { post } from '../apis';

const ManualRegistration = () => {
  const navigation = useNavigation();

  const [diaNacimiento, setDiaNacimiento] = useState('');
  const [mesNacimiento, setMesNacimiento] = useState('');
  const [anoNacimiento, setAnoNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ano_diagnostico, setAnoDiagnostico] = useState('');
  const [ano_sintomas, setAnoSintomas] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('paciente');
  const [especialidad, setEspecialidad] = useState('');
  const [aniosExperiencia, setAniosExperiencia] = useState('');

  const handleRegister = async () => {
    if ( !diaNacimiento || !mesNacimiento || !anoNacimiento || !email || !password || !role) {
        setError('Todos los campos son obligatorios');
        return;
    }
    
    if (role === 'paciente' && (!ano_diagnostico || !ano_sintomas)) {
      setError('Completa los datos de diagnótico y síntomas');
      return;
    }
    if (role === 'medico' && (!especialidad || !aniosExperiencia)){
      setError('Completa los datos de especialidad y experiencia');
      return;
    }

    const formattedDia = diaNacimiento.padStart(2, '0');
    const formattedMes = mesNacimiento.padStart(2, '0');
    const formattedAno = anoNacimiento;
    const fechaNacimiento = `${formattedAno}-${formattedMes}-${formattedDia}`;

    if (!isValidDate(fechaNacimiento)) {
        setError('Fecha de nacimiento inválida.');
        return;
    }

    const age = calculateAge(fechaNacimiento);

    try {
        const response = await post("/registro",{ email, password, age,
          role,
          ...(role === 'paciente' && {
            ano_diagnostico, ano_sintomas
          }),
          ...(role === 'medico' && {
            especialidad,
            anios_experiencia: parseInt(aniosExperiencia)
          })
         });
        console.log('Registro exitoso:', response.data);
        
        navigation.navigate('DayPeriod', { userEmail: email, role  });
        Alert.alert('Registro exitoso', '¡Bienvenido! Tu registro ha sido exitoso.');
    } catch (error) {
        console.error('Error en el registro:', error);
        setError('Error en el registro, por favor intenta de nuevo');
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date.toISOString().slice(0, 10) === dateString;
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>


      </View>
      <ScrollView style={styles.form}>
      <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@dominio.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>Día:</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="DD"
              value={diaNacimiento}
              onChangeText={setDiaNacimiento}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>Mes:</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="MM"
              value={mesNacimiento}
              onChangeText={setMesNacimiento}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>Año:</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="AAAA"
              value={anoNacimiento}
              onChangeText={setAnoNacimiento}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>

    {role === 'paciente' ? ( 
      <>
        <Text style={styles.label}>Año de diagnóstico:</Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA"
          value={ano_diagnostico}
          onChangeText={setAnoDiagnostico}
          keyboardType="numeric"
          maxLength={4}
        />
        <Text style={styles.label}>Año de inicio de síntomas:</Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA"
          value={ano_sintomas}
          onChangeText={setAnoSintomas}
          keyboardType="numeric"
          maxLength={4}
        />
      </>
    ) : (
      <>
        <Text style={styles.label}>Especialidad médica:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Neurología"
          value={especialidad}
          onChangeText={setEspecialidad}
        />

        <Text style={styles.label}>Años de experiencia:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 5"
          value={aniosExperiencia}
          onChangeText={setAniosExperiencia}
          keyboardType="numeric"
        />
      </>
    )}

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Rol:</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            marginBottom: 20,
            backgroundColor: '#fff',
          }}
        >
          <Picker selectedValue={role} onValueChange={setRole}>
            <Picker.Item label="Paciente" value="paciente" />
            <Picker.Item label="Médico" value="medico" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
    </View>
  );
};

export default ManualRegistration;
