import React, { useState } from 'react';
import Type from './Type.jsx';
import queryString from 'query-string';
import types from '../data/types.json';
import pokemonData from '../data/pokemon.json';

const cap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getPokemonFromUrl = (type = 'Normal') => {
  let params = queryString.parse(location.hash);
  const chosen = params[type] || params[type.toLowerCase()];
  if (chosen) {
    const chosenPokemon = cap(chosen);
    return chosenPokemon;
  }
  return false;
};

const Types = ({ changeUrl }) => {
  const [state, setState] = useState({ types: [] });
  return (
    <div className="p-2">
      <div className="flex flex-wrap -mx-2">
        {types.map((type) => {
          return (
            <Type
              changeUrl={changeUrl}
              key={type.english}
              pokemonData={pokemonData}
              chosen={getPokemonFromUrl(type.english)}
              name={type.english}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Types;
