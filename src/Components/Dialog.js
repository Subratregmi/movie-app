import * as React from 'react'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'

import LoginregisterTabs from './LoginRegisterTabs'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' color='error' onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <LoginregisterTabs />
      </Dialog>
    </div>
  )
}
