import React, { useState, useEffect, useReducer } from 'react';
import useHash from '../hooks/useHash';
import Pokemon from './Pokemon';
import className from 'classnames';

const initialState = {
  pokemon: false,
  chosen: null,
  openChoose: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMON':
      return { ...state, pokemon: action.payload };
    case 'SET_CHOSEN':
      return { ...state, chosen: action.payload };
    case 'SET_OPEN':
      return { ...state, openChoose: true };
    case 'SET_CLOSED':
      return { ...state, openChoose: false };
  }
};

const Type = ({ name, pokemonData, backgroundColor, type }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hash, setHash] = useHash(name);

  useEffect(() => {
    const type = name;
    const pokemonOfThisType = pokemonData.filter((p) => {
      if (p.id == hash) {
        dispatch({ type: 'SET_CHOSEN', payload: p });
      }
      return p.types.includes(type);
    });
    dispatch({ type: 'SET_POKEMON', payload: pokemonOfThisType });
  }, []);

  const handleResetPokemon = () => {
    dispatch({ type: 'SET_CHOSEN', payload: null });
    setHash('');
  };

  const handleClickOpen = () => {
    dispatch({ type: 'SET_OPEN' });
  };

  const handleChoosePokemon = (pokemon) => {
    dispatch({ type: 'SET_CHOSEN', payload: pokemon });
    dispatch({ type: 'SET_CLOSED' });
    setHash(pokemon.id);
  };

  const pokemon = state.pokemon;
  if (!pokemon) return null;
  // Order by the pokemon #
  pokemon.sort((a, b) => {
    return a.id - b.id;
  });

  const classNames = className(
    {
      'col-span-2 md:col-span-6': state.openChoose,
    },
    'w-full bg-gray-100 p-2',
  );

  const buttonClassNames = className(
    { striped: !state.chosen },
    'w-100 text-gray-200 my-2 p-2 bg-gray-800 border border-grey-200 rounded cursor-pointer',
  );

  return (
    <div className={classNames}>
      <div className="flex justify-center">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      {state.chosen && (
        <div>
          <Pokemon
            key={pokemon.name}
            choosePokemon={handleChoosePokemon}
            details={state.chosen}
            onClick={handleResetPokemon}
            backgroundColor={backgroundColor}
            type={type}
            width="w-full"
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
              key={pokemon.name}
              type={type}
              choosePokemon={handleChoosePokemon}
              details={pokemon}
            />
          ))}
        </div>
      )}

      {!state.chosen && (
        <div className={buttonClassNames} onClick={() => handleClickOpen()}>
          choose 🔮
        </div>
      )}
    </div>
  );
};

export default Type;
