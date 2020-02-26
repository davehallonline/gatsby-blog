import React from 'react'
import { RichText } from 'prismic-reactjs'
import Layout from '../components/layout'

// (...) Query definition
export const query = graphql`
{
    prismic {
        allBlog_posts(last: 10) {
          edges {
            node {
              title
              location
              mainimage
              content
              _linkType
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
  
  return (
    <Layout>
        <div>
        <h1>{RichText.render(doc.node.title)}</h1>
        <h3>{RichText.render(doc.node.content)}</h3>
        
        </div>
    </Layout>  
  );
}