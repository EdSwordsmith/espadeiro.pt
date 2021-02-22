import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#193142",
        },
        secondary: {
            main: "#2F4554",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
        text: {
            primary: "#000",
            secondary: "#fff",
        },
    },
})

export default theme
