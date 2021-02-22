import React from "react"
import { Box, IconButton, Typography } from "@material-ui/core"

import useStyles from "../components/styles"
import { GitHub, LinkedIn, Twitter } from "@material-ui/icons"

const IndexPage = () => {
    const classes = useStyles()

    return (
        <Box className={classes.hero} bgcolor="primary.main" color="white">
            <div className={classes.container}>
                <Typography variant="h1" className={classes.title} align="center">
                    Hi, I'm Eduardo!
                    <br />
                    <IconButton href="https://github.com/EdSwordsmith" target="_blank">
                        <GitHub style={{ fontSize: 50, color: "white" }} />
                    </IconButton>
                    <IconButton href="https://twitter.com/EdSwordsmith" target="_blank">
                        <Twitter style={{ fontSize: 50, color: "white" }} />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/eduardo-espadeiro/" target="_blank">
                        <LinkedIn style={{ fontSize: 50, color: "white" }} />
                    </IconButton>
                </Typography>
            </div>
        </Box>
    )
}

export default IndexPage
