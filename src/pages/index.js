import React from 'react'
import { graphql, Link } from "gatsby"
import { RichText } from 'prismic-reactjs'
import Layout from '../components/layout'
import { linkResolver } from '../utils/linkResolver'
import SEO from "../components/seo"
import Img from "gatsby-image"

// (...) Query definition
export const query = graphql`
{
  prismic {
    allBlog_posts(last: 10) {
      edges {
        node {
          ... on PRISMIC_Blog_post{
          date
          title
          location
          content
          summary
          _linkType
            _meta{
              id
              uid
              type
            }
          } 
          mainimageSharp {
            childImageSharp {
              fluid(maxWidth: 500, maxHeight: 500) {
                base64
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
}
`

const BlogPosts = ({ posts }) => {
  if (!posts) return null
  return (
    <ul>
      {posts.map(post => {
        return (
          <li key={post.node._meta.id}>
            <Link to={linkResolver(post.node._meta)}>
              {RichText.asText(post.node.title)}
            </Link>
            <span>&nbsp;&nbsp;<time>{post.node.date}</time></span>
            <p>
              {RichText.asText(post.node.summary)}
            </p>
          </li>
        )
      })}
    </ul>
  )
}


export default ({ data }) => {
  const doc = data.prismic.allBlog_posts.edges.slice(0, 1).pop()
  const posts = data.prismic.allBlog_posts.edges

  if (!doc) return null

  return (
    <div className="application">
      <SEO title={doc.node.title} description={doc.node.summary} />
      <Layout>
        
        <BlogPosts posts={posts} />
      </Layout>
    </div>
  )
  
}