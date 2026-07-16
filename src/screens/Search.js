import * as React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, device, fonts, gStyle, images, strings } from '../constants';
import searchContent, { searchSuggestions } from '../services/api/search';
import { ToastContext } from '../context/ToastContext';
import { ProfileContext } from '../context/ProfileContext';
import MediaItemScroller from '../components/MediaItemScroller';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import SvgBackground from '../components/icons/Svg.Background';
import SvgSearch from '../components/icons/Svg.Search';

const searchCategories = ['Movies', 'TV Shows', 'Anime', 'Marvel', 'DC'];
const trendingKeywords = [
  'Avengers',
  'Mandalorian',
  'Space',
  'Cyberpunk',
  'Anime'
];
const Search = () => {
  const navigation = useNavigation();
  const showToast = React.useContext(ToastContext);
  const { recentSearches, addSearchTerm, removeRecentSearch, clearAllRecent } =
    React.useContext(ProfileContext);

  const [inputText, setInputText] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [isLoadingResults, setIsLoadingResults] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Pagination and Refresh state
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  // Debounce input to trigger search
  React.useEffect(() => {
    if (inputText.trim() === '') {
      setSearchText('');
      setSuggestions([]);
      setResults([]);
      setShowSuggestions(false);
      return () => {};
    }
    setShowSuggestions(true);
    const debounceTimer = setTimeout(() => {
      setSearchText(inputText);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputText]);

  // Fetch search results and suggestions when searchText changes
  React.useEffect(() => {
    if (searchText.trim() === '') {
      setResults([]);
      setSuggestions([]);
      return;
    }

    setIsLoadingResults(true);
    setPage(1);
    setHasMore(true);

    searchContent(searchText, 1)
      .then((res) => {
        setResults(res);
        if (res.length < 9) {
          setHasMore(false);
        }
        setIsLoadingResults(false);
      })
      .catch(() => {
        setResults([]);
        setIsLoadingResults(false);
      });

    searchSuggestions(searchText)
      .then((res) => {
        setSuggestions(res);
      })
      .catch(() => {
        setSuggestions([]);
      });
  }, [searchText]);

  const handleSearchSubmit = (term) => {
    addSearchTerm(term);
    setShowSuggestions(false);
    setInputText(term);
    setSearchText(term);
  };

  const handleSuggestionPress = (term) => {
    addSearchTerm(term);
    setShowSuggestions(false);
    setInputText(term);
    setSearchText(term);
  };

  const clearSearchInput = () => {
    setInputText('');
    setSearchText('');
    setResults([]);
    setSuggestions([]);
    setShowSuggestions(false);
    showToast('Search cleared');
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    if (searchText.trim() === '') {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 600);
    } else {
      setPage(1);
      setHasMore(true);
      searchContent(searchText, 1)
        .then((res) => {
          setResults(res);
          if (res.length < 9) {
            setHasMore(false);
          }
          setIsRefreshing(false);
        })
        .catch(() => {
          setIsRefreshing(false);
        });
    }
  };

  const loadMoreResults = () => {
    if (isLoadingMore || !hasMore || searchText.trim() === '') return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    searchContent(searchText, nextPage)
      .then((res) => {
        if (res.length < 9) {
          setHasMore(false);
        }
        setResults((prev) => [...prev, ...res]);
        setPage(nextPage);
        setIsLoadingMore(false);
      })
      .catch(() => {
        setIsLoadingMore(false);
      });
  };

  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const renderResultItem = React.useCallback(
    ({ item }) => (
      <TouchableOpacity
        accessible
        accessibilityLabel={`Movie ${item.title}`}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('MovieDetails', { movie: item });
        }}
        style={styles.cardContainer}
      >
        <Image source={images[item.poster]} style={styles.cardImage} />
      </TouchableOpacity>
    ),
    [navigation]
  );

  const getItemLayout = React.useCallback(
    (data, index) => ({
      length: 155,
      offset: 155 * index,
      index
    }),
    []
  );

  let content;
  if (showSuggestions && suggestions.length > 0) {
    content = (
      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={suggestion}
            onPress={() => handleSuggestionPress(suggestion)}
            style={styles.suggestionRow}
          >
            <View style={styles.suggestionSearchIcon}>
              <SvgSearch active size={16} />
            </View>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  } else if (isLoadingResults) {
    content = (
      <View style={styles.skeletonWrapper}>
        <LoadingSkeleton count={3} type="card" />
        <LoadingSkeleton count={3} type="card" />
      </View>
    );
  } else if (searchText !== '' && results.length === 0) {
    content = (
      <EmptyState
        description="Try searching for a different movie, show, or category."
        title="No results found"
      />
    );
  } else if (results.length > 0) {
    content = (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={results}
        getItemLayout={getItemLayout}
        initialNumToRender={9}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={9}
        numColumns={3}
        onEndReached={loadMoreResults}
        onEndReachedThreshold={0.4}
        refreshControl={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            tintColor={colors.white}
          />
        }
        removeClippedSubviews
        renderItem={renderResultItem}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.loaderMore}>
              <LoadingSkeleton count={3} type="card" />
            </View>
          ) : null
        }
      />
    );
  }

  return (
    <View style={gStyle.container}>
      <View style={gStyle.posAbsolute}>
        <SvgBackground />
      </View>

      <View style={styles.headerSpacer} />

      {/* Search Input Bar */}
      <View style={styles.containerSearchInput}>
        <View style={styles.searchIcon}>
          <SvgSearch active size={20} />
        </View>
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={(e) => handleSearchSubmit(e.nativeEvent.text)}
          placeholder={strings.searchPlaceholder}
          placeholderTextColor={colors.inactiveGrey}
          selectionColor={colors.storageBlue}
          style={styles.input}
          value={inputText}
        />
        {inputText !== '' && (
          <TouchableOpacity
            onPress={clearSearchInput}
            style={styles.clearInputButton}
          >
            <Text style={styles.clearInputText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {inputText === '' ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              tintColor={colors.white}
            />
          }
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Horizontal Category Chips */}
          <Text style={styles.sectionHeading}>{strings.browseCategories}</Text>
          <ScrollView
            contentContainerStyle={styles.containerChips}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {searchCategories.map((category) => (
              <TouchableOpacity
                accessible
                accessibilityLabel={`Category ${category}`}
                activeOpacity={0.7}
                key={category}
                onPress={() => handleSearchSubmit(category)}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Trending Searches */}
          <Text style={styles.sectionHeading}>Trending Searches</Text>
          <View style={styles.trendingKeywordsContainer}>
            {trendingKeywords.map((keyword) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={keyword}
                onPress={() => handleSearchSubmit(keyword)}
                style={styles.keywordBadge}
              >
                <Text style={styles.keywordBadgeText}>{keyword}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recently Searched Section */}
          {recentSearches.length > 0 && (
            <View style={styles.containerRecent}>
              <View style={styles.containerRecentHeader}>
                <Text style={styles.sectionHeading}>Recently Searched</Text>
                <TouchableOpacity onPress={clearAllRecent}>
                  <Text style={styles.clearText}>{strings.clearAll}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.recentTags}>
                {recentSearches.map((term) => (
                  <View key={term} style={styles.tag}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleSearchSubmit(term)}
                    >
                      <Text style={styles.tagText}>{term}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeRecentSearch(term)}
                      style={styles.tagClose}
                    >
                      <Text style={styles.tagCloseText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Trending Now FlatList scroller */}
          <Text style={styles.sectionTitle}>{strings.trendingHeader}</Text>
          <MediaItemScroller dataset="trending" />

          {/* Popular This Week scroller */}
          <Text style={styles.sectionTitle}>{strings.popularHeader}</Text>
          <MediaItemScroller dataset="hits" />

          <View style={gStyle.spacer24} />
        </ScrollView>
      ) : (
        <View style={styles.resultsContainer}>{content}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    flex: 1 / 3,
    height: 145,
    margin: 6,
    overflow: 'hidden'
  },
  cardImage: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  },
  chip: {
    backgroundColor: colors.profileEditBackground,
    borderColor: colors.categoryBorder,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  chipText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14
  },
  clearInputButton: {
    padding: 6
  },
  clearInputText: {
    color: colors.inactiveGrey,
    fontSize: 16
  },
  clearText: {
    color: colors.storageBlue,
    fontFamily: fonts.medium,
    fontSize: 14
  },
  containerChips: {
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 8
  },
  containerRecent: {
    marginBottom: 24
  },
  containerRecentHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16
  },
  containerSearchInput: {
    alignItems: 'center',
    backgroundColor: colors.searchBarBg,
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    marginBottom: 20,
    marginHorizontal: 16,
    paddingHorizontal: 12
  },
  headerSpacer: {
    height: device.iPhoneNotch ? 60 : 36
  },
  input: {
    color: colors.white,
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 15,
    height: '100%'
  },
  keywordBadge: {
    backgroundColor: colors.profileEditBackground,
    borderRadius: 6,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  keywordBadgeText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 13
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  loaderMore: {
    marginVertical: 10
  },
  recentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    paddingHorizontal: 16
  },
  resultsContainer: {
    flex: 1
  },
  scrollContainer: {
    paddingBottom: 24
  },
  searchIcon: {
    marginRight: 10
  },
  sectionHeading: {
    color: colors.heading,
    fontFamily: fonts.bold,
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 16
  },
  sectionTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: 12,
    marginLeft: 16,
    marginTop: 20
  },
  skeletonWrapper: {
    marginTop: 20
  },
  suggestionRow: {
    alignItems: 'center',
    borderBottomColor: colors.moreSectionBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  suggestionSearchIcon: {
    marginRight: 12,
    opacity: 0.6
  },
  suggestionText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14
  },
  suggestionsContainer: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 10
  },
  tag: {
    alignItems: 'center',
    backgroundColor: colors.profileEditBackground,
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 6,
    paddingVertical: 6
  },
  tagClose: {
    marginLeft: 8,
    padding: 2
  },
  tagCloseText: {
    color: colors.inactiveGrey,
    fontSize: 12
  },
  tagText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14
  },
  trendingKeywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    paddingHorizontal: 16
  }
});

export default Search;
