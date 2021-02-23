import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Typography,
} from "@material-ui/core"

import useStyles from "../components/styles"

const Project = ({ title, image, projectUrl, code }) => {
    return (
        <Card style={{ marginBottom: 20 }}>
            <CardHeader title={title} />
            <CardMedia
                component="img"
                alt={title}
                height="400"
                image={image}
                title={title}
            />
            <CardActions>
                {code ? <Button href={code}>Code</Button> : undefined}
                <Button href={projectUrl}>Project Page</Button>
            </CardActions>
        </Card>
    )
}

const ProjectsPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allProjectsYaml(sort: { fields: [date], order: DESC }) {
                edges {
                    node {
                        title
                        image
                        projectUrl
                        code
                    }
                }
            }
        }
    `)
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Typography variant="h2" style={{ marginBottom: 20 }}>
                Projects
            </Typography>
            {data.allProjectsYaml.edges.map(edge => {
                return <Project {...edge.node} />
            })}
        </div>
    )
}

export default ProjectsPage
