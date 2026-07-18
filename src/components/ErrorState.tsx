import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../constants';

interface ErrorStateProps {
  message: string;
  onRetry?: (() => void) | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry = null }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.message}>{message}</Text>
    {onRetry && (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onRetry}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  message: {
    color: colors.inactiveGrey,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: colors.storageBlue,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 10
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
    textTransform: 'uppercase'
  }
});

export default ErrorState;
