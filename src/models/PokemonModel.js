import { getPokemon, getPokemons } from '@helpers/network';

const PokemonModel = {
  state: {
    payload: [],
    fetching: false,
    error: false,
  },
  reducers: {
    reset: (state) => ({ ...state, fetching: false, error: false }),
    request: (state) => ({ ...state, fetching: true, error: false }),
    success: (state, payload) => ({
      ...state,
      payload,
      error: false,
      fetching: false,
    }),
    add: (state, payload) => {
      state.payload.push(...payload);
      state.fetching = false;
      return state;
    },
    failure: (state) => ({ ...state, error: true, fetching: false }),
  },
  effects: {
    async requestPokemons(offset) {
      this.request();
      const pokemonsResponse = await getPokemons(offset);
      if (pokemonsResponse.ok) {
        const { data } = pokemonsResponse;
        loadPokemon(data, (response) => this.success(response));
      } else {
        this.failure();
      }
    },
    async requestMorePokemons(offset) {
      this.request();
      const pokemonsResponse = await getPokemons(offset);
      if (pokemonsResponse.ok) {
        const { data } = pokemonsResponse;
        loadPokemon(data, (response) => {
          this.add(response);
        });
      } else {
        this.failure();
      }
    },
  },
};

async function loadPokemon(data, callback) {
  const temp = await data.results
    .map(async (v) => {
      const { name } = v;
      return getPokemon(name);
    })
    .reduce((result, obj) => {
      return [...result, obj];
    }, []);

  Promise.all(temp).then(async (res) => {
    if (res) {
      const pokemons = await res
        .map((v) => {
          const { data: pokemonData } = v;
          return pokemonData;
        })
        .reduce((result, obj) => {
          return [...result, obj];
        }, []);

      callback(pokemons);
    }
  });
}
export default PokemonModel;
