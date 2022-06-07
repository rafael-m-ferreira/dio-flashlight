/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toogle, setToogle] = useState(false);

  const handleChangeToogle = () => {
    setToogle(oldToogle => !oldToogle);
  };

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toogle);
  }, [toogle]);
  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToogle(oldToogle => !oldToogle);
    });
    // Essa função vai ser chamada quando o componente for ser desmontado
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={toogle ? style.containerLight : style.container}>
      <Text
        accessibilityLabel="Desafio: Construindo um App usando Sensor de Movimento com React Native"
        style={toogle ? style.textOnTop : style.textOffTop}>
        Desafio: Construindo um App usando Sensor de Movimento com React Native
      </Text>
      <TouchableOpacity onPress={handleChangeToogle}>
        <Image
          style={toogle ? style.lightingOn : style.lightingOff}
          source={
            toogle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toogle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
      <Text
        accessibilityLabel="Desenvolvido por: Rafael Ferreira"
        style={toogle ? style.textOn : style.textOff}>
        Desenvolvido por: Rafael Ferreira
      </Text>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 150,
    width: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    height: 150,
    width: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 250,
    width: 250,
  },
  textOnTop: {
    color: 'black',
    textAlign: 'center',
    marginVertical: '10%',
    width: '55%',
  },
  textOffTop: {
    color: 'white',
    textAlign: 'center',
    marginVertical: '10%',
    width: '55%',
  },
  textOn: {
    color: 'black',
    textAlign: 'center',
    marginVertical: '5%',
  },
  textOff: {
    color: 'white',
    textAlign: 'center',
    marginVertical: '5%',
  },
});
