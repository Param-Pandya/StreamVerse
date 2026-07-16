import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../constants';
import AnimatedPressable from './AnimatedPressable';

const MoodChip = ({ mood, selected, onPress }) => {
  return (
    <AnimatedPressable
      accessible
      accessibilityLabel={`Mood: ${mood}`}
      onPress={onPress}
      style={[
        styles.chipContainer,
        selected ? styles.chipSelected : styles.chipUnselected
      ]}
    >
      <Text
        style={[
          styles.chipText,
          selected ? styles.textSelected : styles.textUnselected
        ]}
      >
        {mood}
      </Text>
    </AnimatedPressable>
  );
};

MoodChip.propTypes = {
  mood: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  chipContainer: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  chipSelected: {
    backgroundColor: colors.storageBlue,
    borderColor: colors.white
  },
  chipUnselected: {
    backgroundColor: colors.profileEditBackground,
    borderColor: colors.categoryBorder
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 14
  },
  textSelected: {
    color: colors.white
  },
  textUnselected: {
    color: colors.heading
  }
});

export default React.memo(MoodChip);
