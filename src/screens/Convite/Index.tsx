import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Convite = () => {
  const [isAccepting, setIsAccepting] = useState<boolean | null>(null);

  const handleAccept = () => {
    setIsAccepting(true);
  };

  const handleDecline = () => {
    setIsAccepting(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chocolate CHOCOMATCH</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Bem Vindo ao CHOCOMATCH</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle2}>Que bom!, você foi convidado para participar de uma brincadeira chamada AMIGO CHOCOLATE, DESEJA ACEITAR OU RECUSAR ?</Text>
        </View>

        <TouchableOpacity style={styles.groupItem} onPress={() => console.log()}>
                
                <Text style={styles.Tituloitem}>Nome do grupo: Os melhores</Text>
                <Text style={styles.subtitleItem}>Qtde de participantes: 10</Text>
                <Text style={styles.subtitleItem}>Valor em R$: 10</Text>
                <Text style={styles.subtitleItem}>Data Revelação: 06/06/2024</Text>
                <Text style={styles.subtitleItem}>Descrição: Este é um grupo destinado para sorteio de chocolates </Text>
              </TouchableOpacity>



        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green', marginBottom: 10 }]}
            onPress={handleAccept}>
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={handleDecline}>
            <Text style={styles.buttonText}>Recusar</Text>
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
  groupItem: {
    backgroundColor: '#ffb48a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },



  formTitle2:{
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Open Sans',

  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5d2417',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Convite;
