import { get } from './xhr';

export function getPokemons(offset, limit = 10) {
  return get('/pokemon', {
    offset,
    limit,
  });
}

export function getPokemon(name) {
  return get(`/pokemon/${name}`);
}
