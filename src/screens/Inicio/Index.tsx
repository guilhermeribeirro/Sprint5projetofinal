import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Button, Image, Platform, FlatList, Modal, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { StackParamList } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../../services/UserService';
import { User }from '../../types/types';
import  { Grupo } from '../../types/types';
import  { Grupo2 } from '../../types/types';
import  { ParticipanteGrupo } from '../../types/types';
import AuthService from '../../types/AuthService';
import { DetalhesGrupoNavigationProp } from '../../routes/stack';

const Inicio = () => {
  const [grupos, setGrupos] = useState<Grupo2[]>([]);
  const [novoGrupo, setNovoGrupo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [participantesMax, setQuantidadeParticipantes] = useState('');
  const [nomeGrupo, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [senhaUsuario, setsenhaUsuario] =  useState('');
  const [dataRevelacao, setDataRevelacao] = useState('');
  const [foto, setPhoto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [participantesGrupo, setParticipantesGrupo] = useState<ParticipanteGrupo[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigation = useNavigation<DetalhesGrupoNavigationProp>();

  const handleCriarGrupo = async () => {
    try {
        const user: User = { usuariosID: 9, email: '', senha: '', nome: '', idUsuario: 9, foto: '' };

        const newGroup: Grupo2 = {
            gruposID: 0, // ID será gerado pela API
            nomeGrupo: nomeGrupo,
            participantesMax: participantesMax,
            valor: valor,
            dataRevelacao: dataRevelacao,
            foto: foto,
            descricao: descricao,
            idUsuario: user.idUsuario,
            iD_Administrador: user.idUsuario, 
            senhaUsuario: senhaUsuario,
        };

        const success = await UserService.createGroup(newGroup);
        if (success) {
            alert('Grupo criado com sucesso!');
            setNome('');
            setQuantidadeParticipantes('');
            setValor('');
            setDataRevelacao('');
            setDescricao('');
            setPhoto('');
            setsenhaUsuario('');
            setModalVisible(false);
            await loadGrupos(user);
        } else {
            alert('Erro ao criar grupo. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro ao criar grupo:', error);
        alert('Erro ao criar grupo. Por favor, tente novamente mais tarde.');
    }
};
  const participantes = [

    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '7' },
    { label: '8' },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleDateInputChange = (text: string) => {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
      setDataRevelacao(text);
    } else if (text === '' || /^\d{0,2}\/\d{0,2}\/\d{0,4}$/.test(text)) {
      setDataRevelacao(text);
    }
  };


  const loadGrupos = async (user: User) => {
    
    const userId = user.usuariosID;

    
    const gruposDoUsuario = await UserService.getGruposDoUsuario(userId);

    const gruposFiltrados = gruposDoUsuario.filter(grupo => {
      return grupo.gruposID === userId && grupo.idUsuario === user.idUsuario;
    });

    setGrupos(gruposFiltrados);
  };

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const user: User = { usuariosID: 9, email: '', senha: '', nome: '', foto: '', idUsuario: 9 };
        const grupos = await UserService.getGruposDoUsuario(user.usuariosID);
        setGrupos(grupos);
      } catch (error) {
        console.error('Erro ao carregar grupos:', error);
      }
    };
  
    fetchGrupos();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chocolate CHOCOMATCH</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Bem Vindo ao CHOCOMATCH</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.loginText}> + Criar mais grupos</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView> 
                  <Text style={styles.formTitle}>Criar Grupo</Text>
                  <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <MaterialIcons name="add-a-photo" size={39} color="white" />
                  </TouchableOpacity>
                  {foto && (
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: foto }} style={[styles.image, styles.borderedImage]} />
                    </View>
                  )}
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Nome do Grupo"
                      placeholderTextColor="#003f5c"
                      onChangeText={(text) => setNome(text)}
                    />
                  </View>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={participantes}
                    sx={{ width: 350 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Quantidade de Participantes"
                        style={{ ...styles.inputText, height: 50, backgroundColor: '#ffb48a', borderRadius: 200, marginBottom: 20, justifyContent: 'center' }}
                      />
                    )}
                    onChange={(event, value) => {
                      if (value) {
                        setQuantidadeParticipantes(value.label);
                      } else {
                        setQuantidadeParticipantes('');
                      }
                    }}
                  />
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Valor"
                      placeholderTextColor="#003f5c"
                      onChangeText={(text) => setValor(text)}
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
                  <TouchableOpacity style={styles.closeBtn} onPress={handleCriarGrupo}>
                    <Text style={styles.closeText}>Adicionar Grupo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeText}>Fechar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Text style={styles.formSubTitle}>Grupos disponíveis na Rede</Text>
          <FlatList
            data={grupos}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.groupItem}
                onPress={() => navigation.navigate('DetalhesGrupo', { nomeGrupo: item.nomeGrupo })}
              >
                //{item.nomeGrupo}
                <Image
            source={{ uri: item.foto }}
            style={{ width: 50, height: 50, borderRadius: 35, alignSelf: 'center' }}
          />
          <Text style={styles.Tituloitem}>Nome do grupo: {item.nomeGrupo}</Text>
          <Text style={styles.subtitleItem}>Qtde de participantes: {item.participantesMax}</Text>
          <Text style={styles.subtitleItem}>Valor em R$: {item.valor}</Text>
          <Text style={styles.subtitleItem}>Data Revelação: {item.dataRevelacao}</Text>
          <Text style={styles.subtitleItem}>Descrição: {item.descricao}</Text>
        </TouchableOpacity>
            )}
            keyExtractor={(item) => item.gruposID.toString()}
          />

              <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogout}>
            <Text style={styles.loginText}> Sair</Text>
          </TouchableOpacity>
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
  Tituloitem: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  subtitleItem: {
    justifyContent: 'center',
    alignItems: 'center',
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
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#5d2417',
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'cover', 
  },
  formSubTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputView: {
    backgroundColor: '#ffb48a',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  descricao: {
    backgroundColor: '#ffb48a',
    borderRadius: 30,
    height: 100,
    marginBottom: 40,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputText: {
    height: 40,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeBtn: {
    backgroundColor: '#5d2417',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  groupItem: {
    backgroundColor: '#ffb48a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  borderedImage: {
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 10, 
  },
});
export default Inicio;
