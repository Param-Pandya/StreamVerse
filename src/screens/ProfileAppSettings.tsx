import * as React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as Device from 'expo-device';
import { colors, fonts, gStyle } from '../constants';
import Header from '../components/Header';
import TouchLineItemApp from '../components/TouchLineItemApp';
import TouchLineItemElement from '../components/TouchLineItemElement';
import SvgBackground from '../components/icons/Svg.Background';
import SvgTrash from '../components/icons/Svg.Trash';

const alertDeleteDownloads = () => {
  Alert.alert(
    'Delete All Downloads',
    'Are you sure you want to delete this one download?',
    [
      {
        text: 'Cancel'
      },
      {
        style: 'destructive',
        text: 'Delete'
      }
    ],
    {
      cancelable: false
    }
  );
};

const ProfileAppSettings: React.FC = () => {
  let deviceType = 'Unknown Device';

  if (Platform.OS === 'ios') {
    deviceType = Device.modelName || 'iPhone';
  } else if (Platform.OS === 'android') {
    deviceType = Device.modelName || 'Android Device';
  }

  return (
    <View style={gStyle.container}>
      <View style={gStyle.posAbsolute}>
        <SvgBackground />
      </View>

      <ScrollView>
        <Header showBack title="App Settings" />

        <View style={styles.containerHeading}>
          <Text style={styles.heading}>Video Playback</Text>
        </View>

        <TouchLineItemApp
          onPress={() => null}
          tagline="Automatic"
          text="Cellular Data Usage"
        />

        <View style={styles.containerHeading}>
          <Text style={styles.heading}>Downloads</Text>
        </View>

        <TouchLineItemApp
          onPress={() => null}
          tagline="Standard"
          text="Video Quality"
        />

        <TouchLineItemElement
          onPress={() => alertDeleteDownloads()}
          element={<SvgTrash size={20} />}
          text="Delete All Downloads"
        />

        <View style={styles.containerDevice}>
          <Text style={styles.deviceText}>{deviceType}</Text>
          <View style={styles.containerStorage}>
            <View style={styles.storageUsed} />
            <View style={styles.storageStreamVerse} />
          </View>
          <View style={styles.containerIndex}>
            <View style={styles.containerIndexBlock}>
              <View style={[styles.indexBlock, styles.used]} />
              <Text style={styles.deviceText}>Used</Text>
            </View>
            <View style={styles.containerIndexBlock}>
              <View style={[styles.indexBlock, styles.streamVerse]} />
              <Text style={styles.deviceText}>StreamVerse</Text>
            </View>
            <View style={styles.containerIndexBlock}>
              <View style={[styles.indexBlock, styles.storage]} />
              <Text style={styles.deviceText}>Free</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeading: {
    borderBottomColor: colors.moreSectionBorder,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  heading: {
    color: colors.moreSectionText,
    fontFamily: fonts.light,
    fontSize: 16,
    textTransform: 'uppercase'
  },
  containerDevice: {
    borderBottomColor: colors.moreSectionBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 8,
    paddingVertical: 8
  },
  deviceText: {
    color: colors.white
  },
  containerStorage: {
    backgroundColor: colors.moreFree,
    flexDirection: 'row',
    height: 10,
    marginVertical: 8,
    width: '100%'
  },
  storageUsed: {
    backgroundColor: colors.moreUsed,
    height: '100%',
    width: '24%'
  },
  storageStreamVerse: {
    backgroundColor: colors.storageBlue,
    height: '100%',
    width: '4%'
  },
  containerIndex: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerIndexBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  indexBlock: {
    borderRadius: 3,
    height: 14,
    marginRight: 10,
    width: 14
  },
  storage: {
    backgroundColor: colors.moreFree
  },
  used: {
    backgroundColor: colors.moreUsed
  },
  streamVerse: {
    backgroundColor: colors.storageBlue
  }
});

export default ProfileAppSettings;
