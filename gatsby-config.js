module.exports = {
    siteMetadata: {
        title: "Eduardo Espadeiro",
        siteUrl: "https://eduespadeiro.com"
    },
    plugins: [
        "website-layout",
        {
            resolve: "gatsby-plugin-netlify-cms",
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-material-ui",
        {
            resolve: "gatsby-plugin-google-fonts",
            options: {
                fonts: ["Roboto:300,400,500", "Nunito"],
                display: "swap",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src`,
                name: "src",
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-prismjs",
                    },
                ],
            },
        },
    ],
}
