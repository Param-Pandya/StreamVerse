import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import { colors, device, fonts } from '../constants';
import { fetchCategories } from '../services/movieService';
import LoadingSkeleton from './LoadingSkeleton';
import SvgCategoryBackground from './icons/Svg.CategoryBackground';
import { Category } from '../types';

interface CategoriesProps {
  activeCategory?: string | null;
  onSelectCategory?: ((categoryName: string) => void) | null;
}

const Categories: React.FC<CategoriesProps> = ({
  activeCategory = null,
  onSelectCategory = null
}) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    fetchCategories().then((data) => {
      if (isMounted) {
        setCategories(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const chipWidth = (device.width - 32) / 3.3;

  if (isLoading) {
    return <LoadingSkeleton type="chip" count={4} />;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((item) => {
        const isActive = activeCategory === item.name;
        return (
          <TouchableOpacity
            accessible
            accessibilityLabel={`Category ${item.name}`}
            activeOpacity={0.7}
            key={item.id}
            onPress={() => onSelectCategory && onSelectCategory(item.name)}
            style={[
              styles.containerBlock,
              { width: chipWidth },
              isActive && styles.activeContainerBlock
            ]}
          >
            <View style={styles.containerBlockBackground}>
              <SvgCategoryBackground height={48} width={chipWidth} />
            </View>
            <Text
              style={[
                styles.categoryText,
                isActive && styles.activeCategoryText
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 24
  },
  containerBlock: {
    alignItems: 'center',
    borderColor: colors.categoryBorder,
    borderRadius: 8,
    borderWidth: 1.2,
    height: 50,
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden'
  },
  activeContainerBlock: {
    borderColor: colors.white,
    borderWidth: 1.8
  },
  containerBlockBackground: {
    borderRadius: 8,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0
  },
  categoryText: {
    color: colors.heading,
    fontFamily: fonts.medium,
    fontSize: 13,
    textAlign: 'center'
  },
  activeCategoryText: {
    color: colors.white,
    fontFamily: fonts.bold
  }
});

export default Categories;
