import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

import useStyles from "./styles"
import Link from "./link"

const Navbar = () => {
    const classes = useStyles()

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Link
                    to="/"
                    color="textSecondary"
                    className={classes.toolbarTitle}
                >
                    <Typography variant="h5">Eduardo Espadeiro</Typography>
                </Link>
                <Toolbar>
                    <Link to="/about" color="textSecondary" className={classes.toolbarLink}>
                        <Typography variant="h6">About Me</Typography>
                    </Link>
                    <Link to="/blog" color="textSecondary" className={classes.toolbarLink}>
                        <Typography variant="h6">Blog</Typography>
                    </Link>
                    <Link to="/projects" color="textSecondary" className={classes.toolbarLink}>
                        <Typography variant="h6">Projects</Typography>
                    </Link>
                </Toolbar>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
