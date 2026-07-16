import * as React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, gStyle, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';

// components
import HeaderManage from '../components/HeaderManage';

const ModalAddProfile = () => {
  const navigation = useNavigation();
  const { addProfile } = React.useContext(ProfileContext);
  const [forKidsValue, setForKidsValue] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleSwitchChange = (value) => {
    if (value === false) {
      Alert.alert(
        'This profile will now allow access to TV shows and movies of all maturity levels.',
        '',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    setForKidsValue(value);
  };

  const handleSave = () => {
    if (text.trim() === '') {
      return;
    }
    addProfile(text.trim(), forKidsValue);
    navigation.goBack();
  };

  return (
    <View style={[gStyle.container, { backgroundColor: colors.black }]}>
      <HeaderManage
        backText="Cancel"
        save
        saveActive={text !== ''}
        title="Create Profile"
        onSave={handleSave}
      />

      <View style={styles.container}>
        <Image source={images.stormtrooper} style={styles.avatar} />
        <Text style={styles.text}>CHANGE</Text>

        <TextInput
          autoCapitalize="none"
          autoFocus
          keyboardAppearance="dark"
          onChangeText={(input) => setText(input)}
          selectionColor={colors.storageBlue}
          style={styles.input}
          value={text}
        />

        <View style={styles.containerSwitch}>
          <Text style={styles.switchLabel}>For Kids</Text>
          <Switch onValueChange={handleSwitchChange} value={forKidsValue} />
        </View>
      </View>
    </View>
  );
};

const BLOCK_SIZE = 108;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: BLOCK_SIZE / 2,
    height: BLOCK_SIZE,
    resizeMode: 'contain',
    width: BLOCK_SIZE
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 60
  },
  containerSwitch: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16
  },
  input: {
    borderColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: 260
  },
  switchLabel: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 16,
    marginRight: 8,
    textTransform: 'uppercase'
  },
  text: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 24,
    marginTop: 8,
    textAlign: 'center'
  }
});

export default ModalAddProfile;
