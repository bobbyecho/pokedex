import { getPokemon } from '@helpers/network/index';

export async function loadPokemon(data, callback) {
  const temp = await data.results
    .map(async (v) => {
      const { name } = v;
      return getPokemon(name);
    })
    .reduce((result, obj) => {
      return [...result, obj];
    }, []);

  resultPokemon(temp, (res) => {
    callback(res);
  });
}

export async function loadFilterPokemon(data, callback) {
  const temp = await data
    .map(async (v) => {
      const {
        pokemon: { name },
      } = v;
      return getPokemon(name);
    })
    .reduce((result, obj) => {
      return [...result, obj];
    }, []);

  resultPokemon(temp, (res) => {
    callback(res);
  });
}

function resultPokemon(d, cb) {
  Promise.all(d).then(async (res) => {
    if (res) {
      const pokemons = await res
        .map((v) => {
          const { data: pokemonData } = v;
          return pokemonData;
        })
        .reduce((result, obj) => {
          return [...result, obj];
        }, []);

      cb(pokemons);
    }
  });
}
