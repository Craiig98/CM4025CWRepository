import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
import {list} from './api-car.js'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    cards: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      }
}))

export default function Cars() {
    const classes = useStyles()
    const [cars, setCars] = useState([])

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
                All Cars
            </Typography>
            <List dense>
                {cars.map((item, i) => {
                return <Link to={"/car/" + item._id} key={i}>

                <Card className={classes.cards}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.make}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.model}
                        </Typography>
                        </CardContent>
                    </CardActionArea>

                <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                    <Person/>
                    </Avatar>
                </ListItemAvatar>
                 <ListItemText primary={item.make}/>
                <ListItemSecondaryAction>
                <IconButton>
                    <ArrowForward/>
                </IconButton>
                </ListItemSecondaryAction>
                <Button variant="contained" color="secondary">
                    Like
                </Button>
                </ListItem>


                </Card>
                </Link>

                })
                }
            </List>
        </Paper>
    )
}
   