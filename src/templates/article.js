import React from 'react'
import { RichText } from 'prismic-reactjs'
import Layout from '../components/layout'
import SEO from "../components/seo"
import Img from "gatsby-image"

// (...) Query definition
export const query = graphql`
query PageQuery($uid: String) {
    prismic {
        allBlog_posts(uid: $uid) {
          edges {
            node {
              title
              location
              mainimage
              summary
              content
              _linkType
              mainimageSharp {
                childImageSharp {
                  fluid{
                    ...GatsbyImageSharpFluid
                    presentationWidth
                  }
                }
              }
            }
          }
        }
      }
}
`

export default ({ data }) => {
  // Required check for no data being returned
  const doc = data.prismic.allBlog_posts.edges.slice(0,1).pop();
  if (!doc) return null;
  
  const title = doc.node.title[0]['text'];
  const summary = doc.node.summary[0]['text'];
  
  return (
    <Layout>
        <SEO title={title} description={summary} />
        <div>
        {RichText.render(doc.node.title)}
        <h3>{RichText.render(doc.node.content)}</h3>
        <Img fluid={doc.node.mainimageSharp.childImageSharp.fluid} />
        </div>
    </Layout>  
  );
}