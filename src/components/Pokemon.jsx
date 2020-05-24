import React from 'react';
import className from 'classnames';

const Pokemon = ({
  details,
  choosePokemon,
  width = 'w-1/2',
  onClick,
  backgroundColor,
  type,
}) => {
  const sprite = `https://play.pokemonshowdown.com/sprites/gen5/${details.name.toLowerCase()}.png`;
  const classNames = className(
    'object-center text-center text-grey-dark flex-grow-0',
    { 'sm:w-1/3 md:w-1/4 lg:w-1/6': !onClick },
    { 'w-full': onClick },
  );
  const classNamesBackground = className(
    'p-6 bg-opacity-25 bg-no-repeat bg-left-top',
  );
  const backgroundImage = !onClick
    ? null
    : {
        backgroundImage: `url(${sprite})`,
        backgroundSize: '300px',
        backgroundColor: backgroundColor,
      };

  return (
    <div
      className={classNames}
      onClick={onClick ? onClick : () => choosePokemon(details)}
    >
      <div className={classNamesBackground} style={backgroundImage}>
        <img
          onClick={onClick ? onClick : () => choosePokemon(details)}
          src={sprite}
          className="cursor-pointer inline"
        />
        <div
          className="capitalize font-bold w-full p-1 mt-2 bg-opacity-75 text-gray-900 striped"
          style={{ backgroundColor: type.boxColor }}
        >
          {details.name}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
