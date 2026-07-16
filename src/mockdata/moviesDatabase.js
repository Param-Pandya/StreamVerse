const moviesDatabase = [
  {
    id: 'ae',
    title: 'Avengers: Endgame',
    poster: 'ae',
    backdrop: 'slideAvengersEndgame',
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    genres: ['Action', 'Sci-Fi', 'Fantasy'],
    runtime: '181m',
    releaseYear: '2019',
    rating: 4.9,
    category: 'Marvel'
  },
  {
    id: 'tm',
    title: 'The Mandalorian',
    poster: 'tm',
    backdrop: 'slideStarWarsMandalorian',
    overview:
      'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    runtime: '45m',
    releaseYear: '2023',
    rating: 4.8,
    category: 'Star Wars'
  },
  {
    id: 'ts',
    title: 'The Simpsons Movie',
    poster: 'ts',
    backdrop: 'slideSimpsons',
    overview:
      "Springfield is in chaos after Homer accidentally pollutes the town's water supply, forcing the EPA to dome the town and the family to flee to Alaska.",
    genres: ['Animation', 'Family', 'Comedy'],
    runtime: '87m',
    releaseYear: '2007',
    rating: 4.5,
    category: 'Movies'
  },
  {
    id: 'cm',
    title: 'Captain Marvel',
    poster: 'cm',
    backdrop: 'slideCaptainMarvel',
    overview:
      "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.",
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '124m',
    releaseYear: '2019',
    rating: 4.7,
    category: 'Marvel'
  },
  {
    id: 'tlk',
    title: 'The Lion King',
    poster: 'tlk',
    backdrop: 'slideLionKing',
    overview:
      "Simba adores his father, King Mufasa, and takes to heart his own royal destiny. But not everyone in the kingdom celebrates the new cub's arrival.",
    genres: ['Adventure', 'Drama', 'Family'],
    runtime: '118m',
    releaseYear: '2019',
    rating: 4.6,
    category: 'Movies'
  },
  {
    id: 'z',
    title: 'Zootopia',
    poster: 'z',
    backdrop: 'slideZootopia',
    overview:
      'In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.',
    genres: ['Animation', 'Adventure', 'Comedy'],
    runtime: '108m',
    releaseYear: '2016',
    rating: 4.8,
    category: 'Movies'
  },
  {
    id: 'a',
    title: 'Avatar',
    poster: 'a',
    backdrop: 'slideAvatar',
    overview:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '162m',
    releaseYear: '2009',
    rating: 4.8,
    category: 'Movies'
  },
  {
    id: 'aiw',
    title: 'Avengers: Infinity War',
    poster: 'aiw',
    backdrop: 'slideAvengersEndgame',
    overview:
      'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    genres: ['Action', 'Sci-Fi', 'Fantasy'],
    runtime: '149m',
    releaseYear: '2018',
    rating: 4.9,
    category: 'Marvel'
  },
  {
    id: 'anhe4',
    title: 'Star Wars: A New Hope',
    poster: 'anhe4',
    backdrop: 'slideStarWars',
    overview:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '121m',
    releaseYear: '1977',
    rating: 4.9,
    category: 'Star Wars'
  },
  {
    id: 'aotce2',
    title: 'Star Wars: Attack of the Clones',
    poster: 'aotce2',
    backdrop: 'slideStarWars',
    overview:
      'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the Senator.',
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Romance'],
    runtime: '142m',
    releaseYear: '2002',
    rating: 4.5,
    category: 'Star Wars'
  },
  {
    id: 'batb',
    title: 'Beauty and the Beast',
    poster: 'batb',
    backdrop: 'slideFantasy',
    overview:
      'A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman.',
    genres: ['Family', 'Fantasy', 'Musical', 'Romance'],
    runtime: '129m',
    releaseYear: '2017',
    rating: 4.4,
    category: 'Movies'
  },
  {
    id: 'cacw',
    title: 'Captain America: Civil War',
    poster: 'cacw',
    backdrop: 'slideAvengersEndgame',
    overview:
      "Political involvement in the Avengers' affairs causes a rift between former allies Captain America and Iron Man.",
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '147m',
    releaseYear: '2016',
    rating: 4.7,
    category: 'Marvel'
  },
  {
    id: 'fz',
    title: 'Frozen',
    poster: 'fz',
    backdrop: 'slideFrozen',
    overview:
      'When newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, Anna teams up with mountain man Kristoff, reindeer Sven, and snowman Olaf to save the kingdom.',
    genres: ['Animation', 'Adventure', 'Comedy'],
    runtime: '102m',
    releaseYear: '2013',
    rating: 4.7,
    category: 'Anime'
  },
  {
    id: 'swatsd',
    title: 'Solo: A Star Wars Story',
    poster: 'swatsd',
    backdrop: 'slideStarWars',
    overview:
      'Board the Millennium Falcon and journey to a galaxy far, far away in an all-new adventure with the most beloved scoundrel in the galaxy.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '135m',
    releaseYear: '2018',
    rating: 4.3,
    category: 'Star Wars'
  },
  {
    id: 'tesbe5',
    title: 'Star Wars: The Empire Strikes Back',
    poster: 'tesbe5',
    backdrop: 'slideStarWars',
    overview:
      'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '124m',
    releaseYear: '1980',
    rating: 4.9,
    category: 'Star Wars'
  },
  {
    id: 'tfae7',
    title: 'Star Wars: The Force Awakens',
    poster: 'tfae7',
    backdrop: 'slideStarWars',
    overview:
      'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, a former stormtrooper, must join forces with Han Solo and Chewbacca to search for the one hope of restoring peace.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '138m',
    releaseYear: '2015',
    rating: 4.7,
    category: 'Star Wars'
  },
  {
    id: 'tpme1',
    title: 'Star Wars: The Phantom Menace',
    poster: 'tpme1',
    backdrop: 'slideStarWars',
    overview:
      'Two Jedi Knights escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their old glory.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '136m',
    releaseYear: '1999',
    rating: 4.5,
    category: 'Star Wars'
  },
  {
    id: 'i',
    title: 'Iron Man',
    poster: 'i',
    backdrop: 'slideIronMan',
    overview:
      'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '126m',
    releaseYear: '2008',
    rating: 4.8,
    category: 'Marvel'
  },
  {
    id: 'b',
    title: 'Black Panther',
    poster: 'b',
    backdrop: 'slideAvengersEndgame',
    overview:
      "T'Challa, heir to the hidden and advanced kingdom of Wakanda, must step forward to lead his people into a new era and confront a challenger from his country's past.",
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '134m',
    releaseYear: '2018',
    rating: 4.7,
    category: 'Marvel'
  },
  {
    id: 'p',
    title: 'Spider-Man: Homecoming',
    poster: 'p',
    backdrop: 'slideCyberpunk',
    overview:
      'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '133m',
    releaseYear: '2017',
    rating: 4.7,
    category: 'Spider-Man Universe'
  },
  {
    id: 'h',
    title: 'The Dark Knight',
    poster: 'h',
    backdrop: 'slideDarkKnight',
    overview:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genres: ['Action', 'Crime', 'Drama'],
    runtime: '152m',
    releaseYear: '2008',
    rating: 4.9,
    category: 'DC'
  },
  {
    id: 'slide_sports',
    title: 'FIFA Final: Spain vs Argentina',
    poster: 'slideSports',
    backdrop: 'slideSports',
    overview:
      'Live broadcast of the epic championship showdown at the FIFA Final between Spain and Argentina.',
    genres: ['Sports', 'Live', 'Soccer'],
    runtime: '120m',
    releaseYear: '2026',
    rating: 4.9,
    category: 'Football'
  },
  {
    id: 'slide_scifi',
    title: 'Interstellar Odyssey',
    poster: 'slideSciFi',
    backdrop: 'slideSciFi',
    overview:
      'A group of space explorers travel through a newly discovered wormhole in an effort to secure the survival of humanity.',
    genres: ['Sci-Fi', 'Space', 'Adventure'],
    runtime: '136m',
    releaseYear: '2025',
    rating: 4.7,
    category: 'Space'
  },
  {
    id: 'slide_cyberpunk',
    title: 'Neon Horizon',
    poster: 'slideCyberpunk',
    backdrop: 'slideCyberpunk',
    overview:
      'In a rain-slicked neon metropolis, a cybernetically enhanced agent uncovers a conspiracy that threatens to rewrite human consciousness.',
    genres: ['Action', 'Cyberpunk', 'Thriller'],
    runtime: '118m',
    releaseYear: '2026',
    rating: 4.6,
    category: 'Cyberpunk'
  },
  {
    id: 'slide_fantasy',
    title: 'Whispers of the Forest',
    poster: 'slideFantasy',
    backdrop: 'slideFantasy',
    overview:
      'A lone traveler enters a mythical glowing forest to retrieve an ancient relic, discovering secrets older than time itself.',
    genres: ['Fantasy', 'Nature', 'Mystery'],
    runtime: '124m',
    releaseYear: '2024',
    rating: 4.5,
    category: 'Fantasy'
  },
  {
    id: 'roasws',
    title: 'Rogue One: A Star Wars Story',
    poster: 'roasws',
    backdrop: 'slideStarWars',
    overview:
      'The daughter of an Imperial scientist joins the Rebel Alliance in a risky move to steal the Death Star plans.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '133m',
    releaseYear: '2016',
    rating: 4.7,
    category: 'Star Wars'
  },
  {
    id: 'sb',
    title: 'Sleeping Beauty',
    poster: 'sb',
    backdrop: 'slideFantasy',
    overview:
      'After being cursed by a malevolent fairy, a princess falls into a deep sleep that can only be broken by a kiss from her true love.',
    genres: ['Animation', 'Family', 'Fantasy'],
    runtime: '75m',
    releaseYear: '1959',
    rating: 4.2,
    category: 'Movies'
  },
  {
    id: 'tlm',
    title: 'The Little Mermaid',
    poster: 'tlm',
    backdrop: 'slideFantasy',
    overview:
      "A young mermaid princess makes a Faustian bargain with a rebellious sea witch to become human and win a prince's love.",
    genres: ['Animation', 'Family', 'Fantasy', 'Romance'],
    runtime: '83m',
    releaseYear: '1989',
    rating: 4.6,
    category: 'Movies'
  },
  {
    id: 'f',
    title: 'Finding Dory',
    poster: 'f',
    backdrop: 'slideAvatar',
    overview:
      'The friendly but forgetful blue tang fish, Dory, begins a search for her long-lost parents, and everyone learns a few things about the real meaning of family along the way.',
    genres: ['Animation', 'Family', 'Comedy'],
    runtime: '97m',
    releaseYear: '2016',
    rating: 4.3,
    category: 'Movies'
  },
  {
    id: 'thond',
    title: 'The Hunchback of Notre Dame',
    poster: 'thond',
    backdrop: 'slideFantasy',
    overview:
      'A deformed bell-ringer must assert his independence from a vicious government minister in order to help his friend, a gypsy dancer.',
    genres: ['Animation', 'Drama', 'Family'],
    runtime: '91m',
    releaseYear: '1996',
    rating: 4.7,
    category: 'Movies'
  },
  {
    id: 'tsits',
    title: 'The Sword in the Stone',
    poster: 'tsits',
    backdrop: 'slideFantasy',
    overview:
      'A poor boy named Arthur learns the power of love, kindness, knowledge and bravery with the help of a wizard named Merlin in the path to claim his throne.',
    genres: ['Animation', 'Family', 'Fantasy'],
    runtime: '79m',
    releaseYear: '1963',
    rating: 4.2,
    category: 'Movies'
  },
  {
    id: 'cap_america',
    title: 'Captain America',
    poster: 'cacw',
    backdrop: 'slideAvengersEndgame',
    overview:
      'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a Super-Soldier serum.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    runtime: '124m',
    releaseYear: '2011',
    rating: 4.6,
    category: 'Marvel'
  },
  {
    id: 'thor',
    title: 'Thor',
    poster: 'cm',
    backdrop: 'slideAvengersEndgame',
    overview:
      'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans on Earth, where he becomes one of their finest defenders.',
    genres: ['Action', 'Adventure', 'Fantasy'],
    runtime: '115m',
    releaseYear: '2011',
    rating: 4.5,
    category: 'Marvel'
  },
  {
    id: 'loki',
    title: 'Loki',
    poster: 'ae',
    backdrop: 'slideAvengersEndgame',
    overview:
      'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame.',
    genres: ['Action', 'Adventure', 'Fantasy'],
    runtime: '50m',
    releaseYear: '2021',
    rating: 4.7,
    category: 'Marvel'
  },
  {
    id: 'joker',
    title: 'Joker',
    poster: 'h',
    backdrop: 'slideDarkKnight',
    overview:
      'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic figure.',
    genres: ['Drama', 'Crime', 'Thriller'],
    runtime: '122m',
    releaseYear: '2019',
    rating: 4.8,
    category: 'DC'
  },
  {
    id: 'the_batman',
    title: 'The Batman',
    poster: 'h',
    backdrop: 'slideDarkKnight',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    runtime: '176m',
    releaseYear: '2022',
    rating: 4.7,
    category: 'DC'
  },
  {
    id: 'justice_league',
    title: 'Justice League',
    poster: 'cacw',
    backdrop: 'slideDarkKnight',
    overview:
      'Fueled by his restored faith in humanity and inspired by Supermans selfless act, Bruce Wayne enlists the help of his new-found ally, Diana Prince, to face an even greater enemy.',
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Fantasy'],
    runtime: '120m',
    releaseYear: '2017',
    rating: 4.4,
    category: 'DC'
  }
];

export default moviesDatabase;
