import React from 'react';

const Pokemon = ({ details, choosePokemon, width = 'w-32', close = false }) => {
  const sprite = `https://play.pokemonshowdown.com/sprites/gen5/${details.name.toLowerCase()}.png`;
  return (
    <div
      className={`${width} p-2 object-center text-center m-1 text-grey-dark h-48`}
    >
      {close && (
        <div className="text-right cursor-pointer text-grey-darkest">
          <button onClick={close} className="p-2 bg-grey-light rounded">
            X
          </button>
        </div>
      )}
      <p>
        <img
          onClick={() => choosePokemon(details)}
          src={sprite}
          className="cursor-pointer"
        />
      </p>
      <p className="capitalize font-bold">{details.name}</p>
    </div>
  );
};

export default Pokemon;
