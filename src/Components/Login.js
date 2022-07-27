import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Divider, Paper, TextField } from '@mui/material'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth, signInWithGoogle } from '../firebase'
import Google from '@mui/icons-material/Google'

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const login = async () => {
    setLoading(true)
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
      alert('User not register')
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
          Login
        </Typography>
        <form>
          <TextField
            required
            placeholder='Email'
            style={{ paddingBottom: '20px' }}
            onChange={(event) => {
              setLoginEmail(event.target.value)
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
              setLoginPassword(event.target.value)
            }}
          />
          <Button
            variant='contained'
            style={{ marginBottom: '10px' }}
            onClick={login}
            // disabled={loading || user != null}
          >
            login
          </Button>
        </form>
        <h4>
          User Logged In:
          <div style={{ color: 'red', justifyContent: 'center' }}>
            {user?.email}
          </div>
        </h4>

        <Button
          variant='contained'
          style={{ marginBottom: '10px' }}
          onClick={logout}
          // disabled={loading || !user}
        >
          Sign Out
        </Button>

        <Divider />

        <Button
          variant='outlined'
          onClick={signInWithGoogle}
          startIcon={<Google />}
        >
          Sign in with Google
        </Button>
      </Paper>
    </div>
  )
}

export default Login
