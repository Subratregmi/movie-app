import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import HoverRating from './Rating'
import { useAuth } from '../firebase'
//import { name } from '../firebase'
import { Button } from '@mui/material'
import LoginregisterTabs from './LoginRegisterTabs'
import FormDialog from './Dialog'
import { Link, NavLink } from 'react-router-dom'
import MovieDetail from './MovieDetail'

const useStyles = makeStyles((theme) => ({
  mainroot: {
    // display: 'flex',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // height: '100%',
  },
  // root: {
  //   display: 'flex',
  //   // justifyContent: 'center',
  //   // marginTop: '10px',
  //   // direction: 'row',
  //   // position: 'relative',
  //   //flexWrap: 'wrap',
  //   justifyContent: 'center',
  //   direction: 'row',
  //   //flexDirection: 'column',
  // },
  media: {
    width: 385,
    height: 450,
  },
  card: {
    backgroundColor: 'black',
    justifyContent: 'center',

    border: '5px solid',
    borderColor: 'white',
    color: 'white',
    boxShadow: theme.shadows[4],
    transition: theme.transitions.create(['background', 'background-color'], {
      duration: theme.transitions.duration.complex,
    }),
    '&:hover': {
      backgroundColor: '#666561',
      color: 'white',
      border: '5px solid',
      borderColor: 'black',
    },
  },
  title: {
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

const MovieCard = (props) => {
  const classes = useStyles()

  const currentUser = useAuth()

  // const { movie } = this.props
  return (
    <>
      <div className={classes.mainroot}>
        {/* <div className={classes.root}> */}
        <Grid
          container
          // direction='row'
          justify='flex-start'
          // alignItems='center'
        >
          <Grid item>
            <Card className={classes.card}>
              {/* <CardMedia className={classes.media} image={movie.Poster} /> */}
              <Link to={`/movie/${props.id}`}>
                <img
                  src={props.image}
                  alt='Poster'
                  className={classes.media}
                  // movie={props.image}
                  alignItems='center'
                />
              </Link>

              <CardContent>
                <Typography variant='h6' gutterBottom className={classes.title}>
                  {props.title}
                </Typography>

                {/* <Button
                    variant='outlined'
                    color='error'
                    sx={{ marginLeft: '270px' }}
                    onClick={<FormDialog />}
                  > */}

                {/* Sign In
                  </Button> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* </div> */}
      </div>
    </>
  )
}

export default MovieCard
