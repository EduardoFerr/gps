import { createMuiTheme } from '@material-ui/core/styles'
import {purple, teal} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: teal[200],
        },
    },
})

export default theme