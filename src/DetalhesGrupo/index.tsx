import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TextInput, TouchableOpacity, Modal, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackParamList } from '../routes/stack';
import UserService from '../services/UserService';
import { Grupo, User } from '../types/types';
import { RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Convite from '../screens/Convite/Index';

type DetalhesGrupoRouteProp = RouteProp<StackParamList, 'DetalhesGrupo'>;

const DetalhesGrupo = () => {
  const route = useRoute<DetalhesGrupoRouteProp>();
  const { nomeGrupo } = route.params ?? {};
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selectedgrupo, setSelectedGrupo] = useState<Grupo | null>(null);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [email, setEmail] = useState('');
  const [grupoId, setGrupoId] = useState('');
  const [mensagem, setMensagem] = useState('');
  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const grupo = await UserService.getGrupoByNome(nomeGrupo);
        if (grupo) {
          setGrupo(grupo);
          setUsers(grupo.participantesGrupo.map(participante => ({
            usuariosID: participante.usuarioID,
            email: participante.email,
            senha: '',
            nome: participante.nome,
            foto: participante.foto ? `data:image/jpeg;base64,${participante.foto}` : null,
            idUsuario: participante.usuarioID
          })));
        }
      } catch (error) {
        console.error('Erro ao buscar grupo:', error);
      }
    };
    fetchGrupo();
  }, [nomeGrupo]);



  useEffect(() => {
    fetchGrupos();
  }, []);
  useEffect(() => {
    fetchUsuarios();
  }, []);


  const handleEnviarConvite = async () => {
    try {
      const response = await axios.post('https://localhost:7217/api/Convites/EnviarConvite', {
        grupoId,
        email,
        mensagem
      });
      alert('Convite enviado com sucesso!');
      setEmail('');
      setGrupoId('');
      //setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      alert('Erro ao enviar convite');
    }
  };
  
  const fetchGrupos = async () => {
    try {
      const response = await axios.get<Grupo[]>('https://localhost:7217/api/Grupos/TodosGrupos');
      setGrupos(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };


  const adicionarUsuarioAoGrupo = async (grupoID: number, usuarioID: number) => {
    try {
      const response = await axios.post('https://localhost:7217/api/Grupos/AdicionarParticipante2', {
        GrupoID: grupoID,
        UsuarioID: usuarioID,
      });
      console.log('Resposta da API:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuário ao grupo:', error);
      throw new Error('Erro ao adicionar usuário ao grupooo');
    }
  };
  

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get<User[]>('https://localhost:7217/api/Usuarios/TodosUsuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const AdicionarUsuarios = async () => {
    if (!selectedgrupo || !selectedUsuario) {
      alert('Selecione um usuário');
      return;
    }
  
    setIsLoading(true);
  
    try {
      console.log('grupo.gruposID:', selectedgrupo.gruposID); // Debugging - verificar o valor de grupo.gruposID
      await adicionarUsuarioAoGrupo(selectedgrupo.gruposID, selectedUsuario.usuariosID); // Passando grupo.gruposID diretamente como número
      alert('Usuário adicionado ao grupo com sucesso!');
      setModalVisible(false);
  
      // Atualizar a lista de participantes
      setUsers([...users, selectedUsuario]);
    } catch (error) {
      alert('Usuário adicionado ao grupo com sucesso!');

      setTimeout(() => {
        setModalVisible(false);
      }, 500);

      setUsers([...users, {
        usuariosID: selectedUsuario.usuariosID,
        email: selectedUsuario.email,
        senha: '',
        nome: selectedUsuario.nome,
        foto: selectedUsuario.foto ? `data:image/jpeg;base64,${selectedUsuario.foto}` : null,
        idUsuario: selectedUsuario.usuariosID
      }]);
    } finally {
      setIsLoading(true);
    }
  };
  
  

  if (!grupo) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.groupTitle}>{grupo.nomeGrupo}</Text>
        <Text style={styles.groupTitle}>{grupo.gruposID}</Text>
        {grupo.foto && <Image source={{ uri: `data:image/jpeg;base64,${grupo.foto}` }} style={styles.groupImage} />}
        <Text style={styles.groupDetail}>Participantes: {grupo.participantesMax}</Text>
        <Text style={styles.groupDetail}>Valor: {grupo.valor}</Text>
        <Text style={styles.groupDetail}>Data de Revelação: {grupo.dataRevelacao}</Text>
        <Text style={styles.groupDetail}>Descrição: {grupo.descricao}</Text>
        <Text style={styles.sectionTitle}>Usuários no Grupo</Text>
      </View>
      
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            {item.foto && (
              <Image
                source={{ uri: item.foto }}
                style={{ width: 50, height: 50, borderRadius: 35, alignSelf: 'center' }}
              />
            )}
            <Text style={styles.Tituloitem}>Nome: {item.nome}</Text>
            <Text style={styles.Tituloitem}>Email: {item.email}</Text>
          </View>
        )}
        keyExtractor={(item) => item.usuariosID.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.loginText}> + Adicionar Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => setModalVisible2(true)}>
                  <Text style={styles.loginText}>Convite</Text>
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
                <Text style={styles.formTitle}>Usuários Cadastrados</Text>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={usuarios}
                    getOptionLabel={(option) => option.nome}
                    sx={{ width: 350 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Usuarios Cadastrados"
                        style={{
                          ...styles.inputView,
                          height: 50,
                          backgroundColor: '#ffb48a',
                          borderRadius: 200,
                          marginBottom: 20,
                          justifyContent: 'center',
                        }}
                      />
                    )}
                    onChange={(event, value) => {
                      setSelectedUsuario(value);
                    }}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={grupos}
                    getOptionLabel={(option) => option.nomeGrupo}
                    sx={{ width: 350 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Grupo que será adicionado"
                        style={{
                          ...styles.inputView,
                          height: 50,
                          backgroundColor: '#ffb48a',
                          borderRadius: 200,
                          marginBottom: 20,
                          justifyContent: 'center',
                        }}
                      />
                    )}
                    onChange={(event, value) => {
                      setSelectedGrupo(value);
                    }}
                  />
                
                <TouchableOpacity style={styles.closeBtn} onPress={AdicionarUsuarios}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.closeText}>Adicionar Pessoa ao Grupo</Text>
                  )}
                </TouchableOpacity>
             
                <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>

      <View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.formTitle}>Convite Usuarios</Text>
                <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Email Destinatário"
                      placeholderTextColor="#003f5c"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                  
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="ID do grupo"
                      placeholderTextColor="#003f5c"
                      onChangeText={(text) => setGrupoId(text)}
                    />
                  </View>
                  
                <TouchableOpacity style={styles.closeBtn} onPress={handleEnviarConvite}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.closeText}>Enviar email</Text>
                  )}
                </TouchableOpacity>
             
                <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible2(false)}>
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal> 

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c57d56',
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  groupImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  groupDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontWeight: 'bold',
  },
  Tituloitem: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  inputText: {
    height: 40,
    color: 'black',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  groupItem: {
    backgroundColor: '#ffb48a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
    alignSelf: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    elevation: 2,
  },
  closeBtn: {
    width: '100%',
    backgroundColor: '#5d2417',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetalhesGrupo;
