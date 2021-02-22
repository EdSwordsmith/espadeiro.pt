import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core"

import useStyles from "../components/styles"
import Link from "../components/link"

const BlogPage = () => {
    const classes = useStyles()
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            date(formatString: "dddd DD MMMM YYYY")
                            image
                        }
                        fields {
                            slug
                        }
                        excerpt
                    }
                }
            }
        }
    `)

    return (
        <div className={classes.container}>
            <Typography variant="h2" style={{marginBottom: 20}}>Blog</Typography>
            <Box display="flex" flexWrap="wrap">
                {data.allMarkdownRemark.edges.map(edge => {
                    return (
                        <Box m={1}>
                            <Card className={classes.cardRoot}>
                                <CardActionArea>
                                    <Link to={`/blog/${edge.node.fields.slug}`}>
                                        <CardHeader 
                                            title={edge.node.frontmatter.title}
                                            subheader={edge.node.frontmatter.date}
                                            subheaderTypographyProps={{ color: "textPrimary" }}
                                        />
                                        <CardMedia
                                            component="img"
                                            alt={edge.node.frontmatter.title}
                                            height="250"
                                            image={edge.node.frontmatter.image}
                                            title={edge.node.frontmatter.title}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" component="p">
                                                {edge.node.excerpt}
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        </Box>
                    )
                })}
            </Box>
        </div>
    )
}

export default BlogPage
