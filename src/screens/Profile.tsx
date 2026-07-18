import * as React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Constants from 'expo-constants';
import { colors, fonts, gStyle, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';
import HeaderAccounts from '../components/HeaderAccounts';
import TouchLineItem from '../components/TouchLineItem';
import AnimatedPressable from '../components/AnimatedPressable';
import SvgBackground from '../components/icons/Svg.Background';
import { Movie } from '../types';

import { Dialog, Portal, Button as PaperButton, Paragraph } from 'react-native-paper';

interface ProfileProps {
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const context = React.useContext(ProfileContext);
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  if (!context) return null;
  const { watchlist, toggleWatchlist } = context;

  const keyExtractor = React.useCallback((item: Movie) => item.id.toString(), []);

  const renderWatchlistItem = React.useCallback(
    ({ item }: { item: Movie }) => (
      <View style={styles.cardWrapper}>
        <AnimatedPressable
          onPress={() => {
            navigation.navigate('MovieDetails', { movie: item });
          }}
          style={styles.card}
        >
          <Image source={images[item.poster] || images.developerPoster} style={styles.cardImage} />
        </AnimatedPressable>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleWatchlist(item)}
          style={styles.removeBadge}
        >
          <Text style={styles.removeBadgeText}>✕</Text>
        </TouchableOpacity>
      </View>
    ),
    [navigation, toggleWatchlist]
  );

  return (
    <View style={gStyle.container}>
      <View style={gStyle.posAbsolute}>
        <SvgBackground />
      </View>

      <HeaderAccounts />

      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        {/* Watchlist Section */}
        <View style={styles.watchlistSection}>
          <Text style={styles.sectionTitle}>My Watchlist</Text>
          {watchlist.length === 0 ? (
            <Text style={styles.emptyText}>
              No movies saved to your watchlist yet.
            </Text>
          ) : (
            <FlatList
              contentContainerStyle={styles.watchlistList}
              data={watchlist}
              horizontal
              initialNumToRender={5}
              keyExtractor={keyExtractor}
              maxToRenderPerBatch={5}
              removeClippedSubviews
              renderItem={renderWatchlistItem}
              showsHorizontalScrollIndicator={false}
              windowSize={3}
            />
          )}
        </View>

        <TouchLineItem
          onPress={() => navigation.navigate('ProfileWatchlist')}
          text="Manage Watchlist"
        />
        <TouchLineItem
          onPress={() => navigation.navigate('ProfileAppSettings')}
          text="App Settings"
        />
        <TouchLineItem onPress={() => null} text="Account" />
        <TouchLineItem onPress={() => null} text="Legal" />
        <TouchLineItem onPress={() => null} text="Help" />
        <TouchLineItem onPress={() => showDialog()} text="Log Out" />

        <Text style={styles.versionText}>
          {`Version: ${
            Constants.expoConfig?.version ??
            '1.0.0'
          }`}
        </Text>
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Sign Out</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>Are you sure that you want to sign out?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton textColor={colors.inactiveGrey} onPress={hideDialog}>No</PaperButton>
            <PaperButton textColor={colors.storageBlue} onPress={hideDialog}>Yes</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: '100%'
  },
  cardImage: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  },
  cardWrapper: {
    borderRadius: 6,
    height: 120,
    marginRight: 14,
    overflow: 'visible',
    position: 'relative',
    width: 80
  },
  emptyText: {
    color: colors.inactiveGrey,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 8
  },
  removeBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(27, 24, 34, 0.9)',
    borderColor: colors.categoryBorder,
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -6,
    top: -6,
    width: 20,
    zIndex: 10
  },
  removeBadgeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 10
  },
  versionText: {
    color: colors.inactiveGrey,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginLeft: 16,
    paddingVertical: 16
  },
  watchlistList: {
    paddingLeft: 16,
    paddingRight: 8
  },
  watchlistSection: {
    marginBottom: 20,
    marginTop: 10
  },
  sectionTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 16
  },
  dialog: {
    backgroundColor: '#1b1822',
    borderColor: colors.categoryBorder,
    borderWidth: 1.5,
    borderRadius: 8
  },
  dialogTitle: {
    color: colors.white,
    fontFamily: fonts.bold
  },
  dialogText: {
    color: colors.heading,
    fontFamily: fonts.regular
  }
});

export default Profile;
