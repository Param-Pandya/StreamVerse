import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
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

// components
import HeaderAccounts from '../components/HeaderAccounts';
import TouchLineItem from '../components/TouchLineItem';
import AnimatedPressable from '../components/AnimatedPressable';

// icons
import SvgBackground from '../components/icons/Svg.Background';

const alertSignOut = () => {
  Alert.alert(
    'Sign Out',
    'Are you sure that you want to sign out?',
    [{ text: 'No' }, { text: 'Yes' }],
    { cancelable: false }
  );
};

const Profile = ({ navigation }) => {
  const { watchlist, toggleWatchlist } = React.useContext(ProfileContext);

  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const renderWatchlistItem = React.useCallback(
    ({ item }) => (
      <View style={styles.cardWrapper}>
        <AnimatedPressable
          onPress={() => {
            navigation.navigate('MovieDetails', { movie: item });
          }}
          style={styles.card}
        >
          <Image source={images[item.poster]} style={styles.cardImage} />
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
        <TouchLineItem onPress={() => alertSignOut()} text="Log Out" />

        <Text style={styles.versionText}>
          {`Version: ${
            Constants.expoConfig?.version ??
            Constants.manifest?.version ??
            '1.0.0'
          }`}
        </Text>
      </ScrollView>
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
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
  }
});

export default Profile;
