import { useState, useEffect } from 'react'
import Footer from './Components/Footer'

// import SearchAppBar from './Components/Header'
import Header from './Components/Header'
import MovieList from './Components/MovieList'

import store from './Store'
import { Provider, useDispatch } from 'react-redux'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieDetail from './Components/MovieDetail'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')

  // const getMovieRequest = async (searchValue) => {
  //   console.log('from fetch ', searchValue)
  //   const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8155fb40`

  //   const response = await fetch(url)
  //   const responseJson = await response.json()

  //   if (responseJson.Search) {
  //     console.log('responseJson.Search ', responseJson.Search)
  //     setMovies(responseJson.Search)
  //   }
  // }

  const fetchGetMovie = () => {
    console.log('from fetch -><><', searchValue)
    axios
      .get(`http://www.omdbapi.com/?s=${searchValue}&apikey=8155fb40`)
      .then(function (response) {
        // handle success
        console.log(response.data.Search)
        setMovies(response.data.Search)
        console.log('frm stae ', movies)
        // dispatch(fetchMovies(response.data.Search))
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }
  useEffect(() => {
    fetchGetMovie()
    // getMovieRequest(searchValue)
  }, [searchValue])

  return (
    <Router>
      <Provider store={store}>
        {/* <SearchAppBar searchValue={searchValue} setSearchValue={setSearchValue} /> */}

        <Routes>
          <Route
            exact
            path='/'
            fixed
            element={
              <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                movies={movies}
              />
            }
          />
          <Route exact path='/movie/:id' element={<MovieDetail />} />
        </Routes>
        <Footer />
      </Provider>
    </Router>
  )
}

export default App
