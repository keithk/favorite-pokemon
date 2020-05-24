const fs = require('fs');
const pokemon = require('./pokemon-full.js')

const keys_to_keep = ['name', 'num', 'types'];
const writePokemon = [];

async function processPokemon() {
  for (let [key, value] of Object.entries(pokemon)) {
    if (value.name.includes('-Totem')) {
      return false;
    }
    writePokemon.push({
      id: value.num,
      name: value.name,
      types: value.types
    })
  }
  return true;
}

async function writePokemonToFile() {
  await processPokemon();
  await fs.writeFileSync('pokemon.json', JSON.stringify(writePokemon));
}

writePokemonToFile();