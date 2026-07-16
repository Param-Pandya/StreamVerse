import * as React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import MoodChip from './MoodChip';

const MOODS = [
  '😊 Feel Good',
  '😂 Comedy',
  '😱 Thriller',
  '🚀 Sci-Fi',
  '❤️ Romance',
  '⚔ Action',
  '🧙 Fantasy',
  '👨👩👧 Family'
];

const MoodSelector = ({ selectedMood, onSelectMood }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {MOODS.map((mood) => (
        <MoodChip
          key={mood}
          mood={mood}
          onPress={() => onSelectMood(mood)}
          selected={selectedMood === mood}
        />
      ))}
    </ScrollView>
  );
};

MoodSelector.propTypes = {
  selectedMood: PropTypes.string,
  onSelectMood: PropTypes.func.isRequired
};

MoodSelector.defaultProps = {
  selectedMood: null
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 10
  }
});

export default React.memo(MoodSelector);
export { MOODS };
