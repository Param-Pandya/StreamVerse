/* eslint-disable */
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../mockdata/moviesDatabase.ts');
const preloadPath = path.resolve(__dirname, '../constants/preloadImages.ts');

// Parse moviesDatabase.ts ESM export
let dbContent = fs.readFileSync(dbPath, 'utf8');
dbContent = dbContent.replace(
  "import { Movie } from '../types';",
  ''
);
dbContent = dbContent.replace(
  'const moviesDatabase: Movie[] =',
  'const moviesDatabase ='
);
dbContent = dbContent.replace(
  'export default moviesDatabase;',
  'module.exports = moviesDatabase;'
);

const tempDbFile = path.resolve(__dirname, './temp_db.js');
fs.writeFileSync(tempDbFile, dbContent, 'utf8');
const moviesDatabase = require(tempDbFile);
try {
  fs.unlinkSync(tempDbFile);
} catch (e) {}

// Parse preloadImages.ts require paths
const preloadContent = fs.readFileSync(preloadPath, 'utf8');
const imagePaths = {};
const matches = preloadContent.matchAll(
  /const\s+(\w+)\s*=\s*require\s*\(\s*['"](.+?)['"]\s*\)/g
);
for (const match of matches) {
  const [_, name, relPath] = match;
  imagePaths[name] = path.resolve(__dirname, '../constants', relPath);
}

console.log('| Movie | Poster Key | Backdrop Key | Status |');
console.log('| :--- | :--- | :--- | :--- |');

let totalMovies = 0;
let validMovies = 0;

for (const movie of moviesDatabase) {
  totalMovies++;
  const posterKey = movie.poster;
  const backdropKey = movie.backdrop;

  const posterPath = imagePaths[posterKey];
  const backdropPath = imagePaths[backdropKey];

  const posterExists = posterPath ? fs.existsSync(posterPath) : false;
  const backdropExists = backdropPath ? fs.existsSync(backdropPath) : false;

  let status = '✓ Resolved';
  if (!posterExists || !backdropExists) {
    status = '✗ Missing Mappings';
  } else {
    validMovies++;
  }

  console.log(`| **${movie.title}** | \`${posterKey}\` | \`${backdropKey}\` | ${status} |`);
}

console.log(`\nAudit Summary: ${validMovies}/${totalMovies} movies resolved successfully.`);
if (validMovies !== totalMovies) {
  process.exit(1);
} else {
  process.exit(0);
}
