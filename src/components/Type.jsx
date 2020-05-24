import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Pokemon from './Pokemon';

const defaultWidth = 'w-1/2 sm:w-1/2 md:w-48 lg:w-48';

const Type = ({ name, changeUrl, chosen, pokemonData }) => {
  const [state, setState] = useState({
    loaded: false,
    width: defaultWidth,
    pokemon: false,
    chosen: null,
    openChoose: false,
  });

  useEffect(() => {
    const type = name;
    const pokemonOfThisType = pokemonData.filter((p) => {
      if (p.name === chosen) {
        setState({ ...state, chosen: p });
      }
      return p.types?.includes(type);
    });
    setState({ ...state, pokemon: pokemonOfThisType, loaded: true });
  }, []);

  const handleResetPokemon = () => {
    setState({ ...state, chosen: null });
    let params = queryString.parse(location.hash);
    delete params[name];
    const stringified = queryString.stringify(params);
    location.hash = stringified;
    changeUrl(location.hash);
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
    // Set it in the URL, for "saving"
    let params = queryString.parse(location.hash);
    params[name] = pokemon.name.english;
    const stringified = queryString.stringify(params);
    location.hash = stringified;
    changeUrl(location.hash);
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
