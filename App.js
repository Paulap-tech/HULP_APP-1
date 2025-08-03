import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './app/Welcome/Welcome';
import LoginScreen from './app/Login/Login';
import RegisterScreen from './app/ManualRegistration/ManualRegistration';
import RegistroSintomas from './app/RegistroSintomas/RegistroSintomas';
import CalendarScreen from './app/CalendarScreen/CalendarScreen';
import RegistroEpisodios from './app/Registro/Registro';
import DayPeriod from './app/DayPeriod/DayPeriod';
import Header from './app/Header/Header'; 
import PersonalInfo from './app/PersonalInfo/PersonalInfo';
import PerfilScreen from './app/Perfil/Perfil'; 
import ListaPacientes from './app/ListaPacientes/ListaPacientes';
import DatosGuardados from './app/DatosGuardados/DatosGuardados';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabStack = createStackNavigator();

const MainTabsWithStack = ({ route }) => {
  const { email, userAge, role, setIsAuthenticated } = route.params;

  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="Tabs">
        {() => (
          <Tab.Navigator
            screenOptions={{
              header: () => <Header email={email} />,
              tabBarActiveTintColor: '#007bff',
              tabBarInactiveTintColor: '#888',
              tabBarLabelStyle: { fontSize: 12 },
            }}
          >
            {role === 'paciente' && (
              <>
                <Tab.Screen 
                  name="Calendario Menstrual" 
                  children={() => <CalendarScreen userEmail={email} />} 
                />
                <Tab.Screen 
                  name="Registro Episodios" 
                  children={() => <RegistroEpisodios userEmail={email} userAge={userAge} />} 
                />
                <Tab.Screen 
                  name="Registro Síntomas" 
                  children={() => <RegistroSintomas userEmail={email} />} 
                />
              </>
            )}
            <Tab.Screen 
              name="Perfil"
              children={({ navigation }) => (
                <PerfilScreen 
                  userEmail={email} 
                  userAge={userAge} 
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            {role === 'medico' && (
              <Tab.Screen 
                name="Pacientes"
                children={() => <ListaPacientes userEmail={email} />}
              />
            )}
          </Tab.Navigator>
        )}
      </TabStack.Screen>
      <TabStack.Screen 
        name="DatosGuardados" 
        component={DatosGuardados} 
      />
    </TabStack.Navigator>
  );
};


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userInfo, setUserInfo] = useState({ email: null, userAge: null, role:null });

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const email = await AsyncStorage.getItem('userEmail');
      const age = await AsyncStorage.getItem('userAge');
      const role = await AsyncStorage.getItem('userRole');

      if (token) {
        setIsAuthenticated(true);
        setUserInfo({ email, userAge: Number(age), role});
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // Puedes agregar un splash screen aquí si quieres

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabsWithStack} 
            initialParams={{ 
              ...userInfo, 
              setIsAuthenticated 
            }} 
          />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen 
                  {...props} 
                  setIsAuthenticated={setIsAuthenticated} 
                  setUserInfo={setUserInfo} 
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="DayPeriod" component={DayPeriod} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="DatosGuardados" component={DatosGuardados} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


