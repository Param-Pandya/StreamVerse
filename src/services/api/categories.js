const categoriesData = [
  { id: '1', name: 'Movies' },
  { id: '2', name: 'TV Shows' },
  { id: '3', name: 'Anime' },
  { id: '4', name: 'Marvel' },
  { id: '5', name: 'DC' }
];

const fetchCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categoriesData);
    }, 300);
  });
};

export default fetchCategories;
