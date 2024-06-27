import React, { useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../routes/stack';

type Props = {
  navigation: StackNavigationProp<'Home'>; // Defina o tipo correto para a propriedade navigation
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [login, setLogin] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const handleLogin = async () => {
    if (!login) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
      // Lógica para autenticação e navegação
      navigation.navigate('Login'); // Navega para a tela 'Login'
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>CHOCOMATCH</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.navButton} activeOpacity={0.1}>
          <Text style={styles.navButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.navButton} activeOpacity={0.1}>
          <Text style={styles.navButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://www.nugali.com.br/upl/noticias/prancheta-1.jpg' }}
          style={styles.image}
        />
        <Text style={styles.motivationalText}>
          Seja bem-vindo à CHOCOMATCH! Junte-se a nós para uma deliciosa brincadeira.
        </Text>
        {/* Conteúdo adicional da página inicial aqui */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c57d56',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5d2417',
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#c57d56',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  motivationalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  image: {
    width: 500,
    height: 400,
    marginBottom: 60,
  },
});

export default Home;
