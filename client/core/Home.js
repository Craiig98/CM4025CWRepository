import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import myImg from './../assets/images/poloGti2.jpg'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
    },
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
    },
    media: {
    minHeight: 400
    },
    credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
    color: '#3f4771'
    }
    },
    mainbody: {
    paddingTop: 20,
    textAlign: 'left'
    },
    subtitle: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingBottom: 8,
        textAlign: 'left',
        fontSize: 20
        }
   }))

   export default function Home(){
    const classes = useStyles()
        return (
            <Card className={classes.card}>
            <Typography variant="h5" className={classes.title}>
            Welcome to Modified Car Co
            </Typography>
            <Typography className={classes.subtitle}>
            Home of some of the best cars around
            </Typography>
            <CardMedia className={classes.media} image={myImg} title="My Image"/>
            <Typography variant="body2" component="p" className={classes.credit}
            color="textSecondary">Photo: Polo GTI</Typography>
            <CardContent>
            <Typography variant="body1" component="p">
            Thank you for visiting the Modified Car Co site.
            We were established in 2021 and aim to provide photos of some of the best cars to provide you with inspiration for your own project.
            </Typography>
            <Typography className={classes.mainbody} variant="body1" component="p">
            To get started, view all our cars. Give us feedback on your favourites by pressing like.
            </Typography>
            </CardContent>
            </Card>
        )
   }