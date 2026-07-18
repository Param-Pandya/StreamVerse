import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, gStyle } from '../constants';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import SvgBackground from '../components/icons/Svg.Background';

const Downloads: React.FC = () => (
  <View className="flex-1" style={gStyle.container}>
    <View style={gStyle.posAbsolute}>
      <SvgBackground />
    </View>

    <Header title="Downloads" />

    <View className="items-center justify-center" style={styles.containerContent}>
      <EmptyState
        description="Download your favourite movies to watch offline."
        title="No Downloads Yet"
      >
        <View style={styles.iconWrapper}>
          <Text style={styles.largeIcon}>📥</Text>
        </View>
      </EmptyState>

      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>COMING SOON</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 80
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  largeIcon: {
    fontSize: 72,
    textAlign: 'center'
  },
  badgeContainer: {
    backgroundColor: colors.profileEditBackground,
    borderColor: colors.storageBlue,
    borderRadius: 20,
    borderWidth: 1.5,
    elevation: 4,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: colors.storageBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  badgeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 1.5,
    textAlign: 'center'
  }
});

export default Downloads;
