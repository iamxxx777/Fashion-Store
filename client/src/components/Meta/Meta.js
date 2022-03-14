import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, keywords, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Fashion Store - the best prices possible",
    descriptiion: "Fashion store brings you all the clothing comforts you need to feel fabulous",
    keywords: "fashion, store, fashion store, Nike, Adidas, Balenciaga, AOMEI, New Balance"
}

export default Meta
