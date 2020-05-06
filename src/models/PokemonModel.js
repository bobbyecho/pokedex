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
    buildStruture: (state, payload) => ({
      ...state,
      payload,
    }),
    failure: (state) => ({ ...state, error: true, fetching: false }),
  },
  effects: {
    async requestPokemons(offset) {
      this.request();
      const pokemonsResponse = await getPokemons(offset);
      if (pokemonsResponse.ok) {
        const { data } = pokemonsResponse;
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

            this.success(pokemons);
          }
        });
      } else {
        this.failure();
      }
    },
  },
};

export default PokemonModel;
