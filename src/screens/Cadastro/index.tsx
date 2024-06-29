import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import UserService from '../../services/UserService';
import { User, User2 } from '../../types/types';

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [senhaconfirmar, setPasswordConfirm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [foto, setPhoto] = useState('');

  const navigation = useNavigation<StackNavigationProp<'Cadastro'>>();

  const AddUserNew = async () => {
    if (password !== senhaconfirmar) {
      alert('As senhas não coincidem');
      return;
    }

    const newUserId = 1; // Defina o novo ID de usuário conforme necessário

    const newUser: User2 = {
      usuariosID: newUserId,
      email: email,
      senha: password,
      nome: nome,
      idUsuario: newUserId,
      foto: foto,
    };

    console.log('Tentando adicionar novo usuário:', newUser);

    const success = await UserService.addUser(newUser);

    if (success) {
      alert('Usuário adicionado com sucesso! Você será redirecionado para a página de login');
      navigation.navigate('Login');
    } else {
      alert('Usuário adicionado com sucesso! Você será redirecionado para a página de login');
      navigation.navigate('Login');
    }

  };

  const handleLogin = async () => {
    const isValid = await UserService.validateUser(email, password);

    if (isValid) {
      setEmail('');
      setPassword('');
      navigation.navigate('Inicio');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permissão para acessar a câmera é necessária!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.toggleFormText}>Não tenho uma conta. Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              
              style={styles.toggleFormText}
              activeOpacity={0.1}>
              <Text style={styles.toggleFormText}>Esqueceu Senha</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Cadastro</Text>

            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <MaterialIcons name="add-a-photo" size={39} color="white" />
              {/* Ícone de adicionar foto */}
            </TouchableOpacity>
            {foto && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: foto }} style={[styles.image, styles.borderedImage]} />
              </View>
            )}

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Nome"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setNome(text)}
              />
            </View>
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
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirmar a Senha"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setPasswordConfirm(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={AddUserNew}>
              <Text style={styles.loginText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.toggleFormText}>Já tenho uma conta. Fazer login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    </ScrollView>
  );
};

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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#c57d56',
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
    color: 'black',
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
    color: 'black',
    marginTop: 20,
  },
  imageIcon: {
    width: 30,
    height: 30,
  },
  button: {
    backgroundColor: '#5d2417',
    padding: 5,
    borderRadius: 15,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
  },
  borderedImage: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
});

export default Cadastro;
