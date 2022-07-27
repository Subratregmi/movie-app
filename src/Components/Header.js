import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Search from '@material-ui/icons/Search'
import { searchMovie, fetchMovies } from '../actions/searchActions'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MovieCard'
import { Button } from '@material-ui/core'
import LoginregisterTabs from './LoginRegisterTabs'
import FormDialog from './Dialog'
import { Link, NavLink } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  moviemap: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '10px 100px 0px 100px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    marginLeft: '600px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  icons: {
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
}))

// export function SearchAppBar(props) {
function Header(props) {
  let { searchValue, setSearchValue, movies } = props
  console.log('header value ', props)
  const dispatch = useDispatch()
  // const text = useSelector((state) => state.movies.text)
  const text = useSelector((state) => state.movies)
  console.log('-> ', text)
  const classes = useStyles()

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('called')
    // this.props.fetchMovies(this.props.text)
    // dispatch(fetchMovies(props.text))
    // console.log('->>>', dispatch(fetchMovies(this.props.text)))
  }

  const inputChangeHandler = (e) => {
    searchValue = e.target.value
    console.log('inputChangeHandler called', searchValue)
    setSearchValue(searchValue)

    // dispatch(searchMovie(event.target.value))
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <FormDialog />

          <Typography className={classes.title} variant='h6' noWrap>
            <Link to='/' style={{ textDecoration: 'none' }}>
              MOVIE APP
            </Link>
          </Typography>

          <div
            className={classes.search}
            onClick={onSubmit}
            // onSubmit={(event) => props.fetchMovies(event.target.text)}
          >
            <Search onClick={() => dispatch(fetchMovies(movies))} />
            {/* <InputBase
              placeholder='Search...' 
              className={classes.input}
              value={props.value}
              onChange={(event) => props.setSearchValue(event.target.value)}
            /> */}

            <InputBase
              placeholder='Search...'
              className={classes.input}
              value={searchValue}
              // onChange={(event) => props.searchMovie(event.target.value)}
              // onChange={(event) => dispatch(searchMovie(event.target.value))}
              onChange={inputChangeHandler}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.moviemap}>
        {movies?.map((ele, ind) => {
          return (
            <div>
              {/* <Link to={`/movie/${props.id}`} title={ele.Title}> */}
              <MovieCard title={ele.Title} image={ele.Poster} id={ele.imdbID} />
              {/* </Link> */}
            </div>
          )
          // image={ele.Poster} />
        })}
      </div>
    </div>
  )
}

export default Header

// const mapStateToProps = (state) => ({
//   text: state.movies.text,
// })
// export default connect(mapStateToProps, { searchMovie, fetchMovies })(
//   SearchAppBar
// )
