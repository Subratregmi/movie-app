import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

//import { AppBar, Container, Toolbar, Typography } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    backgroundColor: 'black',
    marginTop: '10vh',
    color: 'white',
  },
}))
export default function Footer() {
  const classes = useStyles()
  return <footer className={classes.footer}>©2021 Subrat </footer>
}

// export default function Footer() {
//   return (
//     <AppBar position='static' style={{ backgroundColor: 'black' }}>
//       <Container maxWidth='md'>
//         <Toolbar>
//           <Typography variant='body1' color='inherit'>
//             © 2019 Gistia
//           </Typography>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   )
// }
