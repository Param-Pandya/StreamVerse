import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, gStyle } from '../constants';

// components
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';

// icons
import SvgBackground from '../components/icons/Svg.Background';
import SvgDownloads from '../components/icons/Svg.Downloads';

const Downloads = () => (
  <View style={gStyle.container}>
    <View style={gStyle.posAbsolute}>
      <SvgBackground />
    </View>

    <Header title="Downloads" />

    <View style={styles.containerContent}>
      <EmptyState
        description="Browse content to start downloading your favorite movies and shows."
        title="You have no downloads yet."
      >
        <View style={styles.glowRing}>
          <SvgDownloads fill={colors.storageBlue} size={48} />
        </View>
      </EmptyState>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  glowRing: {
    alignItems: 'center',
    backgroundColor: 'rgba(137, 80, 252, 0.15)',
    borderColor: colors.storageBlue,
    borderRadius: 60,
    borderWidth: 1.5,
    elevation: 6,
    height: 100,
    justifyContent: 'center',
    shadowColor: colors.storageBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: 100
  }
});

export default Downloads;
