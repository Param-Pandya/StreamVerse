import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../constants';
import AnimatedPressable from './AnimatedPressable';

interface MoodChipProps {
  mood: string;
  selected: boolean;
  onPress: () => void;
}

const MoodChip: React.FC<MoodChipProps> = ({ mood, selected, onPress }) => {
  return (
    <AnimatedPressable
      accessible
      accessibilityLabel={`Mood: ${mood}`}
      onPress={onPress}
      className="flex-row items-center justify-center"
      style={[
        styles.chipContainer,
        selected ? styles.chipSelected : styles.chipUnselected
      ]}
    >
      <Text
        className="text-center"
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
