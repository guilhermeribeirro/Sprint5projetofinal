import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import EsqueciSenha from '../screens/EsqueciSenha';
import PaginaInicio from '../screens/PaginaInicio';
import Inicio from '../screens/Inicio/Index';
import Convite from '../screens/Convite/Index';
import DetalhesGrupo from '../DetalhesGrupo';




const Stack = createNativeStackNavigator();

type StackNavigation = {
    Login : undefined;
    Home : undefined;
    Cadastro: undefined;
    EsqueciSenha: undefined;
    PaginaInicio:  undefined;
    Inicio: undefined;
    Convite: undefined;
    DetalhesGrupo: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>


export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen  name="Home" component={Home} options={{headerShown: false }}  />
                <Stack.Screen  name="Login" component={Login} options={{headerShown: false }} />
                <Stack.Screen  name="Cadastro" component={Cadastro}  />
                <Stack.Screen  name="EsqueciSenha" component={EsqueciSenha} options={{headerShown: false }} />
                <Stack.Screen  name="PaginaInicio" component={PaginaInicio} />
                <Stack.Screen  name="Inicio" component={Inicio} />
                <Stack.Screen  name="Convite" component={Convite} />
                <Stack.Screen  name="DetalhesGrupo" component={DetalhesGrupo} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}