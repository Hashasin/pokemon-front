import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonThumbnail from './components/PokemonThumbnail';

function App() {

  const [allPokemons, setallPokemons] = useState([]);
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=50');

   const getAllPokemons = async () =>{
     const res = await fetch(loadMore)
     const data = await res.json()

      setLoadMore(data.next)
      console.log(data)

     function createPokemonObject  (result) {
     result .forEach(async pokemon => {
       const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
       const data = await res.json()

       setallPokemons(currentlist => [...currentlist, data]) 
     })
     }
     createPokemonObject(data.results)
     await console.log(allPokemons);
   }

   useEffect (() => {
   getAllPokemons()
   },[])

  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons ()}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
