import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {listadmin} from './api-user.js'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5),
        maxWidth: 600,
        margin: 'auto',
        marginTop: 40
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}))

export default function Users({ match }) {
    const classes = useStyles()
    const [cars, setCars] = useState([])
    const jwt = auth.isAuthenticated()

    var nButtonClicks = 0
    var hButtonClicks = 0

    //Get the total number of clicks for each button type from the list recieved from database
    cars.forEach((car) => {
      nButtonClicks += car.normalButtonClicks
    })

    cars.forEach((car) => {
      hButtonClicks += car.heartButtonClicks
    })

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listadmin({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
                console.log("Here is the user data")
                console.log(data)
              setCars(data)
            }
          })

        return function cleanup(){
        abortController.abort()
    }
}, [match.params.userId])

return (
    <Card className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
                Heart Button Clicks
            </Typography>
            <List dense>
                {cars.map((item, i) => {
                return <Link to={"/dashboard"} key={i}>
                <ListItem card>
                <ListItemText primary={item.make + " " + item.model}/>
                <ListItemSecondaryAction>
                    <ListItemText primary={item.heartButtonClicks}/>
                </ListItemSecondaryAction>
                </ListItem>
                </Link>
                })
                }
            </List>
            
            <Typography variant="h6" style={{textAlign: "right", paddingRight: 10}} className={classes.title} >
                {"Total: " + hButtonClicks}
            </Typography>

            <Typography variant="h6" className={classes.title}>
                Standard Button Clicks
            </Typography>
            <List dense>
                {cars.map((item, i) => {
                return <Link to={"/dashboard"} key={i}>
                <ListItem card >
                <ListItemText primary={item.make + " " + item.model}/>
                <ListItemSecondaryAction>
                <ListItemText primary={item.normalButtonClicks}/>
                </ListItemSecondaryAction>
                </ListItem>
                </Link>


                })
                }
            </List>
            <Typography variant="h6" style={{textAlign: "right", paddingRight: 10}} className={classes.title}>
                {"Total: " + nButtonClicks}
            </Typography>
    </Card>
  )
}