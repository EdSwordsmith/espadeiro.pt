import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    hero: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        margin: "100px auto",
        width: "90%",
        maxWidth: 900,
    },
    title: {
        fontSize: "4rem",
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 400,
    },
    text: {
        fontSize: 26,
    },
    portrait: {
        width: "60%",
        maxHeight: "200px",
        objectFit: "cover",
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    toolbar: {
        flexWrap: "wrap",
    },
    toolbarLink: {
        marginLeft: 20,
    },
}))

export default useStyles
