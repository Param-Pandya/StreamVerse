import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, fonts, gStyle, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';
import HeaderManage from '../components/HeaderManage';
import SvgEdit from '../components/icons/Svg.Edit';
import { Profile } from '../types';

const ModalManageProfiles: React.FC = () => {
  const context = React.useContext(ProfileContext);
  if (!context) return null;
  const { profiles, updateProfileName } = context;

  const [editingProfileId, setEditingProfileId] = React.useState<string | null>(null);
  const [editNameText, setEditNameText] = React.useState('');

  const startEditing = (profile: Profile) => {
    setEditingProfileId(profile.id);
    setEditNameText(profile.name);
  };

  const saveProfileName = (id: string) => {
    if (editNameText.trim() !== '') {
      updateProfileName(id, editNameText.trim());
    }
    setEditingProfileId(null);
  };

  return (
    <View style={[gStyle.container, { backgroundColor: colors.black }]}>
      <HeaderManage />

      <View style={styles.container}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.containerUser}>
            {editingProfileId === profile.id ? (
              <View style={styles.editSection}>
                <Image source={images[profile.avatar] || images.elsa} style={styles.avatar} />
                <TextInput
                  autoFocus
                  keyboardAppearance="dark"
                  onChangeText={(text) => setEditNameText(text)}
                  onSubmitEditing={() => saveProfileName(profile.id)}
                  selectionColor={colors.storageBlue}
                  style={styles.editInput}
                  value={editNameText}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => saveProfileName(profile.id)}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => startEditing(profile)}
                style={styles.profileWrapper}
              >
                <Image source={images[profile.avatar] || images.elsa} style={styles.avatar} />
                <Text style={styles.text}>{profile.name}</Text>
                <View style={styles.overlay} />
                <View style={styles.containerSvg}>
                  <SvgEdit active size={40} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const BLOCK_SIZE = 80;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: BLOCK_SIZE / 2,
    height: BLOCK_SIZE,
    resizeMode: 'contain',
    width: BLOCK_SIZE
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  containerSvg: {
    ...gStyle.posAbsolute,
    alignItems: 'center',
    height: BLOCK_SIZE,
    justifyContent: 'center',
    width: BLOCK_SIZE
  },
  containerUser: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12
  },
  editInput: {
    borderColor: colors.storageBlue,
    borderRadius: 4,
    borderWidth: 1.5,
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
    width: 100
  },
  editSection: {
    alignItems: 'center'
  },
  overlay: {
    ...gStyle.posAbsolute,
    backgroundColor: colors.black,
    borderRadius: BLOCK_SIZE / 2,
    height: BLOCK_SIZE,
    opacity: 0.4,
    width: BLOCK_SIZE
  },
  profileWrapper: {
    alignItems: 'center'
  },
  saveButton: {
    backgroundColor: colors.storageBlue,
    borderRadius: 4,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  saveButtonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    marginTop: 12
  }
});

export default ModalManageProfiles;
