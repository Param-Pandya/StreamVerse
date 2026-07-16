import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, device, fonts, gStyle, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';

// icons
import SvgPlus from './icons/Svg.Plus';

const ICON_SIZE = 74;

const HeaderAccounts = () => {
  const navigation = useNavigation();
  const { profiles, selectProfile } = React.useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <View style={styles.containerAccounts}>
        {profiles.map((profile) => {
          const isUsernameActive = profile.active ? styles.usernameActive : {};

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={profile.id}
              onPress={() => selectProfile(profile.id)}
              style={styles.containerUser}
            >
              <Image source={images[profile.avatar]} style={styles.avatar} />
              <Text style={[styles.username, isUsernameActive]}>
                {profile.name}
              </Text>
              {profile.active && <View style={styles.avatarActive} />}
            </TouchableOpacity>
          );
        })}

        {profiles.length < 4 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ModalAddProfile')}
            style={styles.containerUser}
          >
            <View style={styles.containerPlus}>
              <SvgPlus size={40} />
            </View>
            <Text style={styles.username}>Add Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ModalManageProfiles')}
        style={styles.containerEditProfiles}
      >
        <Text style={styles.editProfilesText}>Edit Profiles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  containerAccounts: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: device.iPhoneNotch ? 64 : 40,
    width: '100%'
  },
  containerUser: {
    alignItems: 'center',
    marginHorizontal: 10
  },
  avatar: {
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    marginBottom: 6,
    overflow: 'hidden',
    resizeMode: 'contain',
    width: ICON_SIZE
  },
  avatarActive: {
    ...gStyle.posAbsolute,
    borderColor: colors.white,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    height: ICON_SIZE,
    width: ICON_SIZE
  },
  username: {
    color: colors.inactiveGrey,
    fontFamily: fonts.medium,
    fontSize: 12,
    marginTop: 4
  },
  usernameActive: {
    color: colors.white,
    fontFamily: fonts.bold
  },
  containerPlus: {
    alignItems: 'center',
    backgroundColor: colors.profileBackground,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    justifyContent: 'center',
    marginBottom: 4,
    width: ICON_SIZE
  },
  containerEditProfiles: {
    alignItems: 'center',
    backgroundColor: colors.profileEditBackground,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24
  },
  editProfilesText: {
    color: colors.white,
    fontFamily: fonts.medium,
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase'
  }
});

export default HeaderAccounts;
