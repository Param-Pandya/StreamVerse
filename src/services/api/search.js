import { moviesDatabase } from './movies';

const getAllUniqueItems = () => {
  return moviesDatabase;
};

const searchContent = (query, page = 1, limit = 9) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query || query.trim() === '') {
        resolve([]);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const uniqueItems = getAllUniqueItems();

      const filtered = uniqueItems.filter((item) => {
        const titleMatch =
          item.title && item.title.toLowerCase().includes(lowerQuery);
        const posterMatch =
          item.poster && item.poster.toLowerCase().includes(lowerQuery);
        const categoryMatch =
          item.category && item.category.toLowerCase().includes(lowerQuery);
        return titleMatch || posterMatch || categoryMatch;
      });

      const start = (page - 1) * limit;
      const end = start + limit;
      resolve(filtered.slice(start, end));
    }, 300);
  });
};

const searchSuggestions = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query || query.trim() === '') {
        resolve([]);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const uniqueItems = getAllUniqueItems();

      const suggestions = uniqueItems
        .filter(
          (item) => item.title && item.title.toLowerCase().includes(lowerQuery)
        )
        .map((item) => item.title)
        .slice(0, 5);

      resolve(suggestions);
    }, 150);
  });
};

export { searchSuggestions };
export default searchContent;
