import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default function SEO({ children, location , description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }

  `)
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
      <link rel="alternate icon" href="/favicon.ico"/>
      {/* Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="uft-8" />
      <meta name="description" content={site.siteMetadata.description}/>
      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename"/>
      <meta property="og:description" content={description}/>
      {children}
    </Helmet>
  )
}

SEO.propTypes = {
  children: PropTypes.object,
  location: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.object
}