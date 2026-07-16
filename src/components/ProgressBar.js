import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../constants';

const ProgressBar = ({ progress }) => {
  const percent = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${percent}%` }]} />
    </View>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.storageBlue,
    height: '100%'
  },
  container: {
    backgroundColor: colors.profileEditBackground,
    borderRadius: 2,
    height: 4,
    overflow: 'hidden',
    width: '100%'
  }
});

export default ProgressBar;
