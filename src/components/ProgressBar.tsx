import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const percent = Math.min(Math.max(progress, 0), 100);

  return (
    <View className="w-full overflow-hidden" style={styles.container}>
      <View className="h-full" style={[styles.bar, { width: `${percent}%` }]} />
    </View>
  );
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
