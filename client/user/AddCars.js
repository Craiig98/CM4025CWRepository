import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-car.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function AddCars() {
  const classes = useStyles()
  const [values, setValues] = useState({
    make: '',
    model: '',
    year: 0,
    description: '',
    price: 0,
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const car = {
      make: values.make || undefined,
      model: values.model || undefined,
      year: values.year || undefined,
      description: values.description || undefined,
      price: values.price || undefined
    }
    create(car).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Add a car to the site
          </Typography>
          <TextField id="make" label="Make" className={classes.textField} value={values.make} onChange={handleChange('make')} margin="normal"/><br/>
          <TextField id="model" label="Model" className={classes.textField} value={values.model} onChange={handleChange('model')} margin="normal"/><br/>
          <TextField id="year"  label="Year" className={classes.textField} value={values.year} onChange={handleChange('year')} margin="normal"/><br/>
          <TextField id="description" label="Description" className={classes.textField} value={values.description} onChange={handleChange('description')} margin="normal"/><br/>
          <TextField id="price" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} margin="normal"/><br/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New Car successfully added to the site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/cars">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              View Cars
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
    )
}