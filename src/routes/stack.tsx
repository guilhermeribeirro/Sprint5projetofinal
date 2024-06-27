import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import Inicio from '../screens/Inicio/Index';
import Convite from '../screens/Convite/Index';
import DetalhesGrupo from '../DetalhesGrupo'; 
import Splash from '../splash';
import { RouteProp } from '@react-navigation/native';

// Definição dos parâmetros de navegação
export type StackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  Inicio: undefined;
  Convite:  { token: string }; 
  DetalhesGrupo: { nomeGrupo: string };
};

// Tipo para a propriedade de navegação
export type StackNavigationProp<T extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, T>;

// Tipo para a propriedade de rota de DetalhesGrupo
export type DetalhesGrupoNavigationProp = StackNavigationProp<'DetalhesGrupo'>;
export type DetalhesGrupoRouteProp = RouteProp<StackParamList, 'DetalhesGrupo'>;

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Convite" component={Convite} />
        <Stack.Screen
          name="DetalhesGrupo"
          component={DetalhesGrupo}
          options={({ route }) => ({ title: route.params.nomeGrupo })}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
