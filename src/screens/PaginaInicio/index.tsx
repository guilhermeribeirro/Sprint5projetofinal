import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, Platform } from 'react-native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; 


import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const PaginaInicio = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [QuantidadeParticipantes, setQuantidadeParticipantes] = useState('');
  const [nome, setNome] = useState('');
  const [valor, setvalor] = useState('');
  const [dataRevelacao, setdataRevelacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [image, setImage] = useState('');
  const navigation = useNavigation<StackTypes>();

  const handleLogin = () => {
    // Aqui você pode adicionar lógica para autenticar o usuário com o email e senha fornecidos
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };
  
  const handleDateInputChange = (text: string) => {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
     
      setdataRevelacao(text); // Define o estado com a data válida
    } else if (text === '' || /^\d{0,2}\/\d{0,2}\/\d{0,4}$/.test(text)) {
      
      setdataRevelacao(text);
    }
  };
  // Função para selecionar uma imagem
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chocolate CHOCOMATCH</Text>
      </View>
      <View style={styles.content}>
        
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Criar Grupo</Text>
              <TouchableOpacity onPress={pickImage} style={styles.button}>
                <MaterialIcons name="add-a-photo" size={24} color="white" /> {/* Ícone de adicionar foto */}
                </TouchableOpacity>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Nome do Grupo"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setNome(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                
                style={styles.inputText}
                placeholder="Quantidade de Participante"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setvalor(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                
                style={styles.inputText}
                placeholder="Valor"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setQuantidadeParticipantes(text)}
              />
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                placeholder="Data Revelação (dd/mm/aaaa)"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => handleDateInputChange(text)}
                keyboardType="numeric" 
                maxLength={10}
                
      />
    </View>
            <View style={styles.descricao}>
              <TextInput
                
                style={styles.inputText}
                placeholder="Descrição"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setDescricao(text)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Salvar Grupo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.toggleFormText}>Não tenho uma conta. Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')} style={styles.toggleFormText} activeOpacity={0.1}>
              <Text style={styles.toggleFormText}>Esqueceu Senha</Text>
            </TouchableOpacity>
          </View>
       
      </View>
    </View>
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
    height: 80,
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
    width: 30, // Defina o tamanho do ícone conforme necessário
    height: 30,
    // Adicione outros estilos conforme necessário
  },
  button: {
    backgroundColor: '#5d2417',
    padding: 10, // Reduza o padding para acomodar o ícone
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center', // Centralize o conteúdo do botão
    alignItems: 'center', // Centralize o conteúdo do botão
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  descricao: {
    width: '80%',
    backgroundColor: '#ffb48a',
    borderRadius: 30,
    height: 100,
    marginBottom: 40,
    justifyContent: 'flex-start',
    padding: 10,
  },
});

export default PaginaInicio;
