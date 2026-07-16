import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const logoStreamVerse = require('../../assets/images/logo/streamverse.png');

const BrandLogo = () => (
  <View style={styles.container}>
    <Image source={logoStreamVerse} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center'
  },
  logo: {
    height: '100%',
    resizeMode: 'contain',
    width: 240
  }
});

export default React.memo(BrandLogo);
