import {useEffect, useState} from 'react';
import {PokeDataDetail} from '../interfaces/PokeDataDetail';
import {pokeApi} from '../api/pokeApi';

export const usePokemon = (id: string) => {
  const [isLoadig, setIsLoadig] = useState(true);
  const [pokemon, setPokemon] = useState<PokeDataDetail>({} as PokeDataDetail);

  const loadPokemon = async () => {
    const {data} = await pokeApi.get<PokeDataDetail>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(data);
    setIsLoadig(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoadig,
    pokemonDetail: pokemon,
  };
};
