import { Box, CssBaseline, ThemeProvider } from "@material-ui/core"
import React from "react"
import { Helmet } from "react-helmet"

import theme from "./theme"
import Navbar from "./navbar"
import Footer from "./footer"

const Head = () => {
    return (
        <Helmet>
            <title>Eduardo Espadeiro</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
        </Helmet>
    )
}

const Layout = props => {
    return (
        <React.Fragment>
            <Head />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Box
                    display="flex"
                    flexDirection="column"
                    style={{ height: "100%", width: "100%" }}
                >
                    <Box
                        flexGrow={1}
                        style={{
                            height: "100%",
                            minHeight: "100vh",
                            width: "100%",
                        }}
                    >
                        {props.children}
                    </Box>
                    <Footer />
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Layout
