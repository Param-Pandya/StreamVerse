import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants';

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description = '',
  children = null
}) => (
  <View style={styles.container}>
    {children && <View style={styles.iconContainer}>{children}</View>}
    <Text style={styles.title}>{title}</Text>
    {description !== '' && (
      <Text style={styles.description}>{description}</Text>
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
  iconContainer: {
    marginBottom: 20
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    color: colors.heading,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  }
});

export default EmptyState;
