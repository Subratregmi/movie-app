import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Divider, Paper, TextField } from '@mui/material'

import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [user, setUser] = useState({})

  const [loading, setLoading] = useState(false)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const register = async () => {
    setLoading(true)
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )

      console.log(user)
    } catch (error) {
      alert('Already exist user')
      console.log(error.message)
    }
    setLoading(false)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div>
      <Paper
        style={{
          padding: '30px 20px',
          width: 400,
          margin: '0px auto',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: 39, textAlign: 'center' }}
          color='text.primary'
          gutterBottom
        >
          Register User
        </Typography>
        <form>
          <TextField
            required
            placeholder='Email'
            style={{ paddingBottom: '20px' }}
            onChange={(event) => {
              setRegisterEmail(event.target.value)
            }}
            fullWidth
          />
          <TextField
            required
            placeholder='Password'
            type='password'
            fullWidth
            style={{ paddingBottom: '20px' }}
            onChange={(event) => {
              setRegisterPassword(event.target.value)
            }}
          />

          <Button
            variant='contained'
            style={{ marginBottom: '10px' }}
            onClick={register}
            // disabled={loading || user != null}
          >
            Create User
          </Button>
        </form>
        <h4>
          User Logged In:
          <div style={{ color: 'red', justifyContent: 'center' }}>
            {user?.email}
          </div>{' '}
        </h4>

        <Button
          variant='contained'
          style={{ marginBottom: '10px' }}
          onClick={logout}
          //   disabled={loading || !user}
        >
          Sign Out
        </Button>
      </Paper>
    </div>
  )
}

export default Register
