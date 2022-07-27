import React, { useEffect, useState } from 'react'
import Header from './Header'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { useParams } from 'react-router'
import HoverRating from './Rating'
import FormDialog from './Dialog'
import { useAuth } from '../firebase'
import { db } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import Paper from '@mui/material/Paper'
import axios from 'axios'

const MovieDetail = () => {
  const { id } = useParams()
  //

  const [Name, setName] = useState('')
  const [Released, setReleased] = useState('')
  const [Genre, setGenre] = useState('')
  const [Plot, setPlot] = useState('')
  const [Image, setImage] = useState('')

  const [users, setUsers] = useState([])

  const rateCollectionRef = collection(db, 'rate')

  useEffect(() => {
    const getvalue = async () => {
      const data = await getDocs(rateCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getvalue()
  }, [])

  // useEffect(() => {
  //   {
  //     async function searchMovies() {
  //       const url = `http://www.omdbapi.com/?i=${id}&apikey=8155fb40`

  //       try {
  //         const res = await fetch(url)
  //         const data = await res.json()

  //         setName(data)
  //         setReleased(data)
  //         setGenre(data)
  //         setPlot(data)
  //         setImage(data)
  //       } catch (err) {
  //         console.error(err)
  //       }
  //     }
  //     searchMovies()
  //   }
  // }, [])

  const searchMovies = () => {
    axios
      .get(`http://www.omdbapi.com/?i=${id}&apikey=8155fb40`)
      .then(function (response) {
        // const res = await fetch(url)
        // const data = await res.json()
        setName(response.data)
        setReleased(response.data)
        setGenre(response.data)
        setPlot(response.data)
        setImage(response.data)
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
    searchMovies()
  }, [])

  const currentUser = useAuth()

  return (
    <>
      <Header />
      <div
        style={{
          textAlign: 'center',
          color: 'black',
          fontFamily: 'Orbitron, sansserif',
        }}
      >
        <img src={Image.Poster} />

        <h1>Title = {Name.Title}</h1>
        <h1>Released = {Released.Released}</h1>
        <h1>Genre = {Genre.Genre}</h1>
        <h3>Plot = {Plot.Plot}</h3>
        <h3
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {currentUser != null ? <HoverRating /> : <FormDialog />}
        </h3>
        <hr />
        <h1>Movie Rating By User</h1>
        <hr />

        <TableContainer
          component={Paper}
          sx={{
            maxWidth: '440px',
            display: 'flex',
            justifyContent: 'center',
            marginLeft: '35%',
          }}
        >
          <Table size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Email</TableCell>
                <TableCell align='center'>Rating</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users
                .filter((user) => user.movieid == id)
                .map((user) => (
                  <TableRow
                    key={user.movieid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='left'>{user.email}</TableCell>
                    <TableCell align='center'>{user.rating}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default MovieDetail
