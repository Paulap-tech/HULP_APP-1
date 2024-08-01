import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './app/Welcome/Welcome';
import LoginScreen from './app/Login/Login';
import RegisterScreen from './app/ManualRegistration/ManualRegistration';
import RegistroSintomas from './app/RegistroSintomas/RegistroSintomas';
import CalendarScreen from './app/CalendarScreen/CalendarScreen';
import RegistroEpisodios from './app/Registro/Registro';
import DayPeriod from './app/DayPeriod/DayPeriod';
import Header from './app/Header/Header'; 
import PersonalInfo from './app/PersonalInfo/PersonalInfo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = ({ route }) => {
  const { email, userAge } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header email={email} />,
        tabBarOptions: {
          activeTintColor: '#007bff',
          inactiveTintColor: '#888',
          labelStyle: { fontSize: 12 },
        },
      }}
    >
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
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DayPeriod" 
          component={DayPeriod} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PersonalInfo" 
          component={PersonalInfo} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
