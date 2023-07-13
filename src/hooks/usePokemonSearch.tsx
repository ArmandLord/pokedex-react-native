import {useEffect, useState} from 'react';
import {pokeApi} from '../api/pokeApi';
import {IPokeData, Result, SimplePokemon} from '../interfaces/PokeData';

export const usePokemonSearch = () => {
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isFetching, setIsFetching] = useState(true);

  const loadPokemons = async () => {
    const resp = await pokeApi.get<IPokeData>(
      'https://pokeapi.co/api/v2/pokemon?limit=1281',
    );
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, picture, name};
    });
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isFetching,
    // methods
    loadPokemons,
  };
};
