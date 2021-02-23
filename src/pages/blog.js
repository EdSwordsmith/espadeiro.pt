import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core"

import useStyles from "../components/styles"
import Link from "../components/link"

const PostItem = props => {
    return (
        <Box marginBottom={4}>
            <Card>
                <CardActionArea>
                    <Link to={`/blog/${props.slug}`}>
                        <CardHeader 
                            title={props.title}
                            subheader={props.date}
                            subheaderTypographyProps={{ color: "textPrimary" }}
                        />
                        <CardMedia
                            component="img"
                            alt={props.title}
                            height="400"
                            image={props.image}
                            title={props.title}
                        />
                        <CardContent>
                            <Typography variant="body2" component="p">
                                {props.excerpt}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
        </Box>
    )
}

const BlogPage = () => {
    const classes = useStyles()
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
            {data.allMarkdownRemark.edges.map(edge => {
                const node = edge.node
                return <PostItem key={node.fields.slug} slug={node.fields.slug} excerpt={node.excerpt} {...node.frontmatter}/>
            })}
        </div>
    )
}

export default BlogPage
