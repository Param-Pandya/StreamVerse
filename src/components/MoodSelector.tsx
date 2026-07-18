import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MoodChip from './MoodChip';

export const MOODS = [
  '😊 Feel Good',
  '😂 Comedy',
  '😱 Thriller',
  '🚀 Sci-Fi',
  '❤️ Romance',
  '⚔ Action',
  '🧙 Fantasy',
  '👨👩👧 Family'
];

interface MoodSelectorProps {
  selectedMood?: string | null;
  onSelectMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood = null, onSelectMood }) => {
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

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 10
  }
});

export default React.memo(MoodSelector);
