// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles'; // Importa los estilos desde un archivo separado

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            console.log('Login successful:', response.data);

            // Extrae todos los datos necesarios del servidor
            const { email: userEmail, age: userAge } = response.data;

            // Asegúrate de pasar los parámetros correctos a MainTabs
            navigation.navigate('MainTabs', { email: userEmail, userAge });
        } catch (error) {
            console.error('Error en el login:', error);

            if (error.response) {
                console.error('Respuesta de error:', error.response.data);

                if (error.response.status === 401) {
                    setError('Email o contraseña incorrectos. Por favor, verifica tus datos.');
                } else {
                    setError('Error interno. Por favor, inténtalo de nuevo más tarde.');
                }
            } else {
                setError('Error de red. Por favor, verifica tu conexión a internet.');
            }
        }
    };

    const handleRegister = () => {
        navigation.navigate('RegisterScreen'); // Navega a la pantalla de registro
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Inicio de sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Regístrate</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default LoginScreen;
