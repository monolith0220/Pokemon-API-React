import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import { Cards } from './components/Card/Cards';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextPage, setNextPage] = useState("")
  const [prevPage, setPrevPage] = useState("")

  useEffect(() => {
    const fetchPokemonData = async ()=> {
      let res = await getAllPokemon(initialURL)
      console.log(res)
      loadPokemon(res.results)
      setNextPage(res.next)
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

  const handlePrev = async () => {
    if(!prevPage) return

    setLoading(true)
    let data = await getAllPokemon(prevPage)
    loadPokemon(data.results)
    setNextPage(data.next)
    setPrevPage(data.previous)
    setLoading(false)

  }

  const handleNext = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextPage)
    loadPokemon(data.results)
    setNextPage(data.next)
    setPrevPage(data.previous)
    setLoading(false)
  }

  return (
    <>
    <Navbar />
      <div className="App">
        {loading ? (
          <p>ローディング中</p>
          ) : (
            <>
              <div className="pokemonCardContainer">
                {pokemonData.map((pokemon, i) => {
                  return (<Cards key={i} pokemon={pokemon}/>)
                })}
              </div>
              <button onClick={handlePrev}>前へ</button>
              <button onClick={handleNext}>次へ</button>
            </>
          )
        }
      </div>
    </>
  )
        }
export default App;
