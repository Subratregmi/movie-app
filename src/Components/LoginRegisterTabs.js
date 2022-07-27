import * as React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button, Paper } from '@mui/material'
import Login from './Login'
import Register from './Register'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function LoginregisterTabs() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }
  const logout = async () => {
    await signOut(auth)
  }
  return (
    <Paper
      elevation={20}
      style={{
        marginTop: '40px',
        width: '440px',
        margin: '20px auto',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
      >
        <Tab label='Login' />
        <Tab label='Register' />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register />
      </TabPanel>
      {/* <h4> User Logged In: </h4>
      {user?.email}
      <Button
        variant='contained'
        style={{ marginBottom: '10px' }}
        onClick={logout}
        disabled={loading || !user}
      >
        Sign Out
      </Button> */}
    </Paper>
  )
}
