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
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
//For loading the full list of cars and storing the likes
import {list, updateHearts, updateNormal} from './api-car.js'

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
        margin: theme.spacing(5),
        textAlign: 'center'
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    cards: {
        maxWidth: 600,
        padding: 10,
        margin: 'auto',
        marginBottom: 15,
        alignSelf: 'center'
    },
    media: {
        height: 160,
        marginBottom: 10
    },
    bodytext: {
        textAlign: 'left'
    },
}))

export default function Cars() {
    const classes = useStyles()
    const [cars, setCars] = useState([])
    const [values, setValues] = useState({
        make: '',
        model:'',
        description: '',
        year: '',
        owner: '',
        mods: '',
        heartButtonTotalClicks: '',
        normalButtonTotalClicks: '',
        error: ''
      })

    const buttonPicker = Math.round(Math.random())

    //var normalButtonTotalClicks = 0
    //var heartButtonTotalClicks = 0

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

    //When heart type button clicked
    const clickSubmitHearts = () => {
        
        const car = {
            heartButtonTotalClicks: values.heartButtonTotalClicks || undefined,
          }
        
        //Call function to update clicks by one
        updateHearts({
            carId: match.params.carId
        }, car).then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
            setValues({...values, carId: data._id})
          }
        })
    }

    //When normal type button clicked
    const clickSubmitNormal = () => {
        
        const car = {
            normalButtonTotalClicks: values.normalButtonTotalClicks || undefined,
          }

        //Call function to update clicks by one
        updateNormal({
            carId: match.params.carId
        }, car).then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
            setValues({...values, carId: data._id})
          }
        })
    }

    //Depending on the result of random selection, display either the front end 
    //which normal type like button or heart shape like button
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
                            <Typography className={classes.bodytext} component="h4">
                                {item.make} 
                            </Typography>
                            <Typography className={classes.bodytext} gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                                {item.model}
                            </Typography>
    
                            <CardMedia
                                className={classes.media}
                                image={imgPlace}
                                title="Placeholder"
                            />
    
                            <Typography className={classes.bodytext} gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                            <Typography className={classes.bodytext} style={{ fontWeight: 600 }} gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                                {"Mods List: " + item.mods}
                            </Typography>
                    <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                        <Person/>
                        </Avatar>
                    </ListItemAvatar>
                     <ListItemText primary={item.owner}/>
                    <ListItemSecondaryAction>
                    <Button variant="contained" color="primary" onClick={clickSubmitNormal}>
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
    //Return same but with hearts
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
                        <Typography className={classes.bodytext} component="h4">
                            {item.make} 
                        </Typography>
                        <Typography className={classes.bodytext} gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                            {item.model}
                        </Typography>

                        <CardMedia
                            className={classes.media}
                            image={imgPlace}
                            title="Placeholder"
                        />

                        <Typography className={classes.bodytext} gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography>
                        <Typography className={classes.bodytext} style={{ fontWeight: 600 }} gutterBottom variant="h5" variant="body2" color="textSecondary" component="p">
                                {"Mods List: " + item.mods}
                        </Typography>
                <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                    <Person/>
                    </Avatar>
                </ListItemAvatar>
                 <ListItemText primary={item.owner}/>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
                <IconButton onClick={clickSubmitHearts} aria-label="Like">
                    <FavoriteIcon style={{ color: red[500], fontSize: 30 }}/>
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
   