import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={Colors.dark} barStyle="dark-content" />
      <Image style={styles.Logo} source={Logo} />
      <Text style={styles.AppName}>Motion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    width: 125,
    height: 125,
  },
  AppName: {
    fontFamily: Fonts.Bold,
    fontSize: 25,
    color: Colors.light,
  },
});

export default Splash;
