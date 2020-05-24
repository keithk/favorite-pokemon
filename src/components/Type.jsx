import React, { useState, useEffect } from 'react';
import useHash from '../hooks/useHash';
import Pokemon from './Pokemon';

const defaultWidth = 'w-1/2 sm:w-1/2 md:w-48 lg:w-48';

const initialState = {
  loaded: false,
  width: defaultWidth,
  pokemon: false,
  chosen: null,
  openChoose: false,
};

const Type = ({ name, changeUrl, chosen, pokemonData }) => {
  const [state, setState] = useState(initialState);

  const [hash, setHash] = useHash(name);

  useEffect(() => {
    const type = name;
    const pokemonOfThisType = pokemonData.filter((p) => {
      if (p.name === hash) {
        console.log('name met hash', p.name, hash);
        setState({ ...state, chosen: p });
      }
      return p.types.includes(type);
    });
    setState({ ...state, pokemon: pokemonOfThisType, loaded: true });
  }, []);

  const handleResetPokemon = () => {
    setState({ ...state, chosen: null });
    setHash('');
  };

  const handleClickOpen = () => {
    console.log('this is a change');
    setState({ ...state, openChoose: true, width: 'full' });
  };

  const handleChoosePokemon = (pokemon) => {
    setState({
      ...state,
      chosen: pokemon,
      openChoose: false,
      width: defaultWidth,
    });
    setHash(pokemon.name);
  };

  const pokemon = state.pokemon;
  if (!pokemon || !state.loaded) return null;
  // Order by the pokemon #
  pokemon.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <div className={`${state.width} p-2 border border-gray-400 bg-gray-300`}>
      <h2 className="py-1 text-2xl font-bold">{name}</h2>
      {state.chosen && (
        <div>
          <Pokemon
            choosePokemon={handleChoosePokemon}
            details={state.chosen}
            close={handleResetPokemon}
          />
        </div>
      )}
      {state.openChoose === true && (
        <div
          className="flex flex-wrap overflow-auto"
          style={{ height: '400px' }}
        >
          {state.pokemon.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              choosePokemon={handleChoosePokemon}
              details={pokemon}
            />
          ))}
        </div>
      )}

      {!state.chosen && (
        <div
          className="w-100 text-gray-800 my-2 p-2 bg-gray-100 border border-grey-200 rounded cursor-pointer"
          onClick={() => handleClickOpen()}
        >
          choose 🔮
        </div>
      )}
    </div>
  );
};

export default Type;
