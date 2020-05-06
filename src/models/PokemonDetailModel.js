import { getPokemon } from '@helpers/network';

const PokemonDetailModel = {
  state: {
    payload: null,
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
    failure: (state) => ({ ...state, error: true, fetching: false }),
  },
  effects: {
    async requestPokemon(id) {
      this.request();
      const pokemonsResponse = await getPokemon(id);
      if (pokemonsResponse.ok) {
        const { data } = pokemonsResponse;
        this.success(data);
      } else {
        this.failure();
      }
    },
  },
};

export default PokemonDetailModel;
