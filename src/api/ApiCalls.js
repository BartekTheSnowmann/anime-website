export const GetAnime = (searchValue) =>
  `https://api.jikan.moe/v4/anime?q=${searchValue}`;

export const getCharacter = (searchValue) =>
  `https://api.jikan.moe/v4/characters?q=${searchValue}`;
