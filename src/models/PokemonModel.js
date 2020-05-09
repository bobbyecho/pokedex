import { getPokemons, getPokemonTypes } from '@helpers/network';
import { loadPokemon, loadFilterPokemon } from '@helpers/services/pokemon';

const PokemonModel = {
  state: {
    payload: [],
    fetching: false,
    fetchingFilter: false,
    error: false,
  },
  reducers: {
    reset: (state) => ({ ...state, fetching: false, error: false }),
    request: (state) => ({ ...state, fetching: true, error: false }),
    requestFilter: (state) => ({
      ...state,
      fetchingFilter: true,
      error: false,
    }),
    success: (state, payload) => ({
      ...state,
      payload,
      error: false,
      fetching: false,
      fetchingFilter: false,
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
    async requestPokemonTypes(id) {
      this.requestFilter();
      const response = await getPokemonTypes(id);
      if (response.ok) {
        const {
          data: { pokemon: pokemons },
        } = response;
        loadFilterPokemon(pokemons, (pokemon) => this.success(pokemon));
      } else {
        this.failure();
      }
    },
  },
};

export default PokemonModel;
