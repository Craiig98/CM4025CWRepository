import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import {list} from './api-car.js'


const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}))


export default function Cars() {
    const classes = useStyles()
    const [cars, setCars] = useState([])

    var nButtonClicks = 0
    var hButtonClicks = 0

    cars.forEach((car) => {
        nButtonClicks += car.normalButtonClicks
    })

    cars.forEach((car) => {
        hButtonClicks += car.heartButtonClicks
    })

    //myFunction(() => {
        //cars.forEach((car) => {
            //nButtonClicks += car.normalButtonClicks
        //}) 
        //return nButtonClicks
    //})

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
        if (data && data.error) {
            console.log(data.error)
        } else {
            setCars(data)
        }
        })

        return function cleanup(){
        abortController.abort()
    }
    }, [])

    return (
        <Paper className={classes.root} elevation={3}>
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
            <Typography variant="h6" gutterBottom variant="h4" className={classes.title}>
                {hButtonClicks}
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
            <Typography variant="h6" className={classes.title}>
                {nButtonClicks}
            </Typography>
        </Paper>
    )
}