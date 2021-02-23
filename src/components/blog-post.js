import React from "react"
import { graphql } from "gatsby"
import { Typography } from "@material-ui/core"

import useStyles from "./styles"

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            frontmatter {
                title
                image
                date
            }
            html
        }
    }
`

const Post = props => {
    return (
        <React.Fragment>
            <Typography variant="h2">{props.title}</Typography>
            <img src={props.image} alt={props.title} width="100%" />
            <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
        </React.Fragment>
    )
}

const BlogPost = props => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Post 
                title={props.data.markdownRemark.frontmatter.title} 
                html={props.data.markdownRemark.html}
                image={props.data.markdownRemark.frontmatter.image}
            />
        </div>
    )
}

export default BlogPost
