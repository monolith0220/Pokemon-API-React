import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import { Cards } from './components/Cards';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() => {
    const fetchPokemonData = async ()=> {
      let res = await getAllPokemon(initialURL)
      loadPokemon(res.results)
      setLoading(false)
    }
    fetchPokemonData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord =  getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }

  return (
    <div className="App">
      {loading ? (
        <p>ローディング中</p> ):
        pokemonData.map((pokemon, i) =>
        <Cards key={i} pokemon={pokemon}/>
        )
        }
    </div>
  )
        }
export default App;
