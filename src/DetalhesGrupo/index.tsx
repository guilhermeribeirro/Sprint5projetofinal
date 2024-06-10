import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Grupo, GroupUser } from '../types/types';
import { RootStackParamList } from '../types/types';

type DetalhesGrupoRouteProp = RouteProp<RootStackParamList, 'DetalhesGrupo'>;

const DetalhesGrupo: React.FC = () => {
  const route = useRoute<DetalhesGrupoRouteProp>();
  const { group } = route.params;
  const [nomeGrupo, setNomeGrupo] = useState(group.nomeGrupo);
  const [participantesMax, setParticipantesMax] = useState(group.participantesMax);
  const [usuarios, setUsuarios] = useState<GroupUser[]>(group.usuarios ? group.usuarios : []);

  const handleSave = () => {
    // Implementar lógica para salvar as alterações
    console.log('Salvar alterações:', { nomeGrupo, participantesMax, usuarios });
  };

  const handleAddUser = (user: GroupUser) => {
    setUsuarios([...usuarios, user]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do grupo:</Text>
      <TextInput
        style={styles.input}
        value={nomeGrupo}
        onChangeText={setNomeGrupo}
      />

      <Text style={styles.label}>Qtde de participantes:</Text>
      <TextInput
        style={styles.input}
        value={participantesMax.toString()}
        onChangeText={(text) => setParticipantesMax((text))}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={handleSave} />

      <Text style={styles.label}>Usuários:</Text>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Adicionar Usuário" onPress={() => handleAddUser({  nome: 'Novo Usuário' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default DetalhesGrupo;
