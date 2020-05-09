import { get } from './xhr';

export function getPokemons(offset, limit = 20) {
  return get('/pokemon', {
    offset,
    limit,
  });
}

export function getPokemon(key) {
  return get(`/pokemon/${key}`);
}

export function getPokemonTypes(key) {
  return get(`/type/${key}`);
}
