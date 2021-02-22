import React from "react"
import { Box, Typography } from "@material-ui/core"

import useStyles from "../components/styles"

const AboutPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <img alt="Eduardo Espadeiro" src="/images/eduardo.png" width="50%" />
            <Typography variant="h2" className={classes.title}>About Me</Typography> 
            <p className={classes.text}>
                Hey, I’m Eduardo Espadeiro, a Developer and Student.
                I love programming and I’m currently studying
                Computer Science and Engineering at Instituto
                Superior Técnico in Lisbon. I enjoy game development
                and my favourite animal is the owl.
            </p>
        </Box>
    )
}

export default AboutPage
