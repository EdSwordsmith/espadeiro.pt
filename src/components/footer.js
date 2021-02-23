import React from "react"
import { Box, Typography } from "@material-ui/core"

const Footer = () => {
    return (
        <Box
            p={2}
            bgcolor="secondary.main"
            style={{ height: "100%", width: "100%" }}
        >
            <Typography color="textSecondary" align="center">
                Powered by Gastby.js, Material UI and Font Awesome © Eduardo Espadeiro
            </Typography>
        </Box>
    )
}

export default Footer
