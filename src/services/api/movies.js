import moviesDatabase from '../../mockdata/moviesDatabase';

const datasets = {
  trending: ['ae', 'tm', 'ts', 'cm', 'tlk', 'z', 'a'],
  recommended: ['anhe4', 'aotce2', 'batb', 'cacw', 'cm', 'fz'],
  hits: ['swatsd', 'tesbe5', 'tfae7', 'tpme1', 'i', 'b'],
  originals: ['roasws', 'sb', 'tlk', 'tlm', 'tm', 'tpme1'],
  vault: ['fz', 'h', 'i', 'roasws', 'sb', 'swatsd'],
  hdr: ['tfae7', 'roasws', 'ae', 'cm']
};

const fetchMoviesByDataset = (dataset) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ids = datasets[dataset];
      if (ids) {
        const list = ids
          .map((id) => moviesDatabase.find((m) => m.id === id))
          .filter(Boolean);
        resolve(list);
      } else {
        reject(new Error(`Dataset ${dataset} not found`));
      }
    }, 400);
  });
};

const fetchMovieDetails = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dbMovie = moviesDatabase.find(
        (m) => m.id.toString() === id.toString()
      );
      if (dbMovie) {
        resolve(dbMovie);
      } else {
        reject(new Error('Movie details not found'));
      }
    }, 400);
  });
};

export { fetchMovieDetails, moviesDatabase };
export default fetchMoviesByDataset;
