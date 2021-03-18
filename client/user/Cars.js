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
//For loading the full list of cars and storing the likes
import {list, updateHearts} from './api-car.js'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import imgPlace from './../assets/images/imagePlaceholder.jpg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

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
        maxWidth: 500,
        padding: 10
      },
      media: {
        height: 160,
      }
}))

export default function Cars() {
    const classes = useStyles()
    const [cars, setCars] = useState([])

    const buttonPicker = Math.round(Math.random())

    var normalButtonTotalClicks = 0
    var heartButtonTotalClicks = 0

    


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

    const clickSubmit = () => {
        
        updateHearts({
          item: item._id}, car)
      }


    if (buttonPicker == 0) {
        return (
            <Paper className={classes.root} elevation={3}>
                <Typography variant="h6" className={classes.title}>
                    All Cars
                </Typography>
                <List dense>
                    {cars.map((item, i) => {
                    return <Link to={"/cars"}>
                    <Card className={classes.cards}>
                        <CardActionArea>
                            <CardContent>
                            <Typography component="h4">
                                {item.make} 
                            </Typography>
                            <Typography gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                                {item.model}
                            </Typography>
    
                            <CardMedia
                                className={classes.media}
                                image={imgPlace}
                                title="Placeholder"
                            />
    
                            <Typography gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
    
    
                            
    
                    <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                        <Person/>
                        </Avatar>
                    </ListItemAvatar>
                     <ListItemText primary={item.make}/>
                    <ListItemSecondaryAction>
                    <Button variant="contained" color="secondary" onClick={clickSubmit}>
                        Like
                    </Button>
                    </ListItemSecondaryAction>
                    </ListItem>
    
                    </CardContent>
                        </CardActionArea>
                    </Card>
                    </Link>
    
                    })
                    }
                </List>
            </Paper>
        )
    } else {
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
                        <Typography component="h4">
                            {item.make} 
                        </Typography>
                        <Typography gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                            {item.model}
                        </Typography>

                        <CardMedia
                            className={classes.media}
                            image={imgPlace}
                            title="Placeholder"
                        />

                        <Typography gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography>


                        

                <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                    <Person/>
                    </Avatar>
                </ListItemAvatar>
                 <ListItemText primary={item.make}/>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
                <IconButton aria-label="Like">
                    <FavoriteIcon style={{ color: red[500] }}/>
                </IconButton>
                </ListItem>

                </CardContent>
                    </CardActionArea>
                </Card>
                </Link>

                })
                }
            </List>
        </Paper>
    )
    }
}
   