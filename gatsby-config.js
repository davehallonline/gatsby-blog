/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `DAVEHALL.DEV | CANTERBURY, UK WEB DEVELOPER`,
    description: `My personal ramblings on life and software development...`,
    author: `Dave Hall`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'davehall-blog', // (required)
        accessToken: 'MC5YaHpBcnhVQUFDSUFMT25W.77-977-9Fe-_ve-_ve-_ve-_ve-_vV7vv73vv73vv71ULx_vv73vv73vv71TOO-_vRPvv73vv71IB--_vUjvv71077-9EQ', // (optional)
        path: '/preview', // (optional, default: /preview)
        previews: false, // (optional, default: false)
        pages: [{ // (optional)
          type: 'Blog_post',         // TypeName from prismic
          match: '/article/:uid',  // Pages will be generated under this pattern (optional)
          path: '/article',        // Placeholder page for unpublished documents
          component: require.resolve('./src/templates/article.js'),
        }],
        sharpKeys: [
          /image|photo|picture/, // (default)
          'profilepic',
        ],
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
  ],
}
