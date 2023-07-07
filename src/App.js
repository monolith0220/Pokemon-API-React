import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemonData = async ()=> {
      let res = await getAllPokemon(initialURL)
      loadPokemon(res.results)
      setLoading(false)
    }
    fetchPokemonData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
      return _pokemonData
  }

  return (
    <div className="App">
      {loading ? (
        <p>ローディング中</p> ): (
          <p>ポケモンデータ取得できました</p>
        )}
    </div>
  )
        }
export default App;
