import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import MovieCard from './MovieCard'
import { fetchMovies } from '../actions/searchActions'

const MovieList = () => {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movies.movies)

  // let content = ''

  // content =
  //   movies.length > 0
  //     ? movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
  // //     : null
  // return <>{/* <div>{content}</div> */}</>
  return (
    <>
      <div>
        <h1></h1>
      </div>
    </>
  )
}

export default MovieList
