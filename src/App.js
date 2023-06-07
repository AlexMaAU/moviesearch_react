import {useState, useEffect} from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './movieCard'

//API Key: c10bc4e

const API_URL = 'http://www.omdbapi.com/?apikey=c10bc4e'

/*
const testMovie = [
  {
    Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Title: "Batman Begins",
    Type: "movie",
    Year: "2005",
    imdbID: "tt0372784"
  },
  {
    Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Title: "AAA Begins",
    Type: "movie",
    Year: "2005",
    imdbID: "tt0372784"
  },
  {
    Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Title: "BBB Begins",
    Type: "movie",
    Year: "2005",
    imdbID: "tt0372784"
  }
]
*/

function App() {

  const [movies, setMovies] = useState([])  //for movie objects array from API
  const [searchTerm, setSearchTerm] = useState("")  //for search input content

  const searchMovies = async (title)=>{
    //search input text from API，return movies object array
    const res = await fetch(`${API_URL}&s=${title}`)
    const data = await (res.json())
    setMovies(data.Search)
  }

  useEffect(()=>{
    searchMovies('superman')
  },[]) //no dependency, load useEffect hook once page loaded

  return (
    <div className='app'>
      <h1>Movie Search</h1>

      <div className='search'>
        <input
          placeholder='search for movies'
          value={searchTerm}
          onChange={(e)=>{
            setSearchTerm(e.target.value)
          }}
          >
        </input>
        <img
          src={SearchIcon}
          alt="Search Icon"
          onClick={async ()=>{
            searchMovies(searchTerm)
          }}
          >
        </img>
      </div>

      {
        //if movies is undefined
        movies?(  
          <div className="container">
            {
              movies.map((movie)=>{
                return (
                    <MovieCard movie={movie}/>
                )
              })
            }
          </div>
        ):(
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
