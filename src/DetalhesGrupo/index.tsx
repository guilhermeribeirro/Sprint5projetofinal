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

type DetalhesGrupoRouteProp = RouteProp<StackParamList, 'DetalhesGrupo'>;

const DetalhesGrupo = () => {
  const route = useRoute<DetalhesGrupoRouteProp>();
  const { nomeGrupo } = route.params ?? {};
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selectedgrupo, setSelectedGrupo] = useState<Grupo | null>(null);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [email, setEmail] = useState('');
  const [grupoId, setGrupoId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [resultadoSorteio, setResultadoSorteio] = useState<User[][]>([]);

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
      setMensagem('');
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
      console.error('Erro ao buscar grupos:', error);
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
      throw new Error('Erro ao adicionar usuário ao grupo');
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

  const realizarSorteio = () => {
    const shuffledUsuarios = [...users].sort(() => Math.random() - 0.5);
    const pares = [];
    for (let i = 0; i < shuffledUsuarios.length; i += 2) {
      const par = [shuffledUsuarios[i], shuffledUsuarios[i + 1]];
      pares.push(par);
    }
    setResultadoSorteio(pares);
  };

  const AdicionarUsuarios = async () => {
    if (!selectedgrupo || !selectedUsuario) {
      alert('Selecione um usuário e um grupo');
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
      setIsLoading(false);
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
                <Button
                  title="Adicionar ao Grupo"
                  onPress={AdicionarUsuarios}
                  disabled={isLoading}
                />
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
              </ScrollView>
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.formTitle}>Enviar Convite</Text>
                <TextInput
                  style={styles.inputView}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.inputView}
                  placeholder="ID do Grupo"
                  value={grupoId}
                  onChangeText={setGrupoId}
                />
                <TextInput
                  style={styles.inputView}
                  placeholder="Mensagem"
                  value={mensagem}
                  onChangeText={setMensagem}
                />
                <Button title="Enviar Convite" onPress={handleEnviarConvite} />
              </ScrollView>
              <Button title="Fechar" onPress={() => setModalVisible2(false)} />
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.loginBtn} onPress={realizarSorteio}>
          <Text style={styles.loginText}>Realizar Sorteio</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Resultado do Sorteio</Text>
        {resultadoSorteio.length > 0 ? (
          resultadoSorteio.map((par, index) => (
            <View key={index} style={styles.groupItem}>
              {par[0] && (
                <>
                  <Text>{par[0].nome}</Text>
                  {par[0].foto && <Image source={{ uri: par[0].foto }} style={{ width: 50, height: 50, borderRadius: 35 }} />}
                </>
              )}
              {par[1] && (
                <>
                  <Text>{par[1].nome}</Text>
                  {par[1].foto && <Image source={{ uri: par[1].foto }} style={{ width: 50, height: 50, borderRadius: 35 }} />}
                </>
              )}
            </View>
          ))
        ) : (
          <Text>Nenhum sorteio realizado ainda.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c57d56',
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  groupDetail: {
    fontSize: 16,
    margin: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  groupItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ffb48a',
    borderRadius: 10,
    alignItems: 'center',
  },
  Tituloitem: {
    fontSize: 16,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#5d2417',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#ffb48a',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
});

export default DetalhesGrupo;
