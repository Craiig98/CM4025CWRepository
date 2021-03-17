import { createMuiTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

const theme = createMuiTheme({
 typography: {
 useNextVariants: true,
 },
 palette: {
 primary: {
 light: '#13b3f0',
 main: '#2d2d2d',
 dark: '#131313',
 contrastText: '#fff',
 },
 secondary: {
 light: '#13b3f0',
 main: '#13b3f0',
 dark: '#13b3f0',
 contrastText: '#000',
 },
 openTitle: '#2d2d2d',
 protectedTitle: pink['400'],
 type: 'light'
 }
 })

 export default theme