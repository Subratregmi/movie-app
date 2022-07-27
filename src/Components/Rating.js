import * as React from 'react'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import { useState, useEffect } from 'react'
import { db, useAuth } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { Button } from '@material-ui/core'
import { useParams } from 'react-router'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Babal',
}

export default function HoverRating() {
  const { id } = useParams()
  const [value, setValue] = useState([])
  const [hover, setHover] = useState(-1)

  // const [users, setUsers] = useState([])

  const currentUser = useAuth()

  const rateCollectionRef = collection(db, 'rate')

  // useEffect(() => {
  //   const getvalue = async () => {
  //     const data = await getDocs(rateCollectionRef)
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }
  //   getvalue()
  // }, [])

  const giveRating = async () => {
    await addDoc(rateCollectionRef, {
      email: currentUser?.email,
      rating: labels[value],
      movieid: id,
    })
  }

  useEffect(() => {
    const data = localStorage.getItem('ratey')
    if (data) {
      setValue(JSON.parse(data))
      setHover(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('ratey', JSON.stringify(value))
  })

  // const setValue = async () => {
  //   await addDoc(rateCollectionRef, { rating: value })
  // }

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name='hover-feedback'
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
      />

      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
      <Button
        varient='outlined'
        onClick={giveRating}
        style={{ backgroundColor: 'black', marginLeft: '50px', color: 'white' }}
      >
        Submit
      </Button>

      {/* {value.map((value) => {
        return <div>movieId: {value.movieid}</div>
      })} */}
    </Box>
  )
}
