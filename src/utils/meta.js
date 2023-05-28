import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = (props) => {
    const {title, description} = props;
  return (
    <Helmet>
      <title>Holidaze | {title}</title>
      <meta name={description}></meta>
    </Helmet>
  )
}

export default Meta;