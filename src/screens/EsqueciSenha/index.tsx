import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image,Platform, } from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; 
import UserService from '../../services/UserService';
import { User } from '../../types/types';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';



const EsqueciSenha = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setNome] = useState('');
  const [password, setPassword] = useState<string>('');
  const [senhaconfimar, setPasswordConfirm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [image, setImage] = useState('');
  const [usernameErro, setUsernameError] = useState(false);
  const [emailcadastro, setEmailcadastro] = useState<string>('');
  const [passwordcadastro, setPasswordcadastro] = useState<string>('');



  const navigation = useNavigation<StackTypes>();


  const userService = new UserService();

 
  const handleLogin = async () => {
    if (!email) {
      setUsernameError(true);
      return;
    }else{
      setUsernameError(false);
    }

      const isValid = await userService.validateUser(email, password);
      
      if (isValid)  {
            
              setEmail('');
              setPassword('');
              navigation.navigate('Inicio');
      } else{
        alert('Usuario ou senha inválidos')
      }
            

    };



  

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Amigo Chocolate CHOCOMATCH</Text>
      </View>
      <View style={styles.content}>
        {isRegistering ? (
          <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Entrar</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Senha"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginBtn} activeOpacity={0.1}>
              <Text style={styles.loginText}>Entrar</Text>
            </TouchableOpacity>
           
         
        </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Esqueceu a senha</Text>
            
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Digite seu Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setEmail(text)}
            />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Enviar Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.toggleFormText}>Lembrei, Desejo fazer login</Text>
            </TouchableOpacity>
          </View>

        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c57d56',
  },
  header: {
    backgroundColor: '#5d2417',
    paddingVertical: 56,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c57d56',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffb48a',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#5d2417',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    
  },
  toggleFormText: {
    color: '#black',
    marginTop: 20,
  },
});


export default EsqueciSenha;