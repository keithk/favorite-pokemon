import React from 'react';
import Types from './components/Types';
import SavedUrl from './components/SavedUrl';
import useHashParam from './hooks/useHash';
import './styles.css';

const Index = () => {
  const [hash, setHash] = useHashParam('');

  return (
    <div className="m-2">
      <h1 className="text-3xl font-bold">Your Favorite Pokemon</h1>
      <Types changeUrl={setHash} />
      <SavedUrl url={`https://favorite-pokemon.glitch.me/${hash}`} />
    </div>
  );
};

export default Index;
