export function isObjEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function pokeImgUrl(name) {
  return `https://img.pokemondb.net/artwork/${name}.jpg`;
}
