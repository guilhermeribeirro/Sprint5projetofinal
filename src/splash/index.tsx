import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../routes/stack';

const Splash: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<'Home'>>();

  // Certifique-se de que o caminho do arquivo JSON de animação esteja correto
  const animacao = require('../../assets/Animation - 1718145239307.json');

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        speed={2.5}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#c57d56',
        }}
        source={animacao}
        onAnimationFinish={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
