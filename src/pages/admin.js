import ImageFile from '@/components/ImageFile'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import React, { Fragment } from 'react'

const admin = () => {
    return (
        <Fragment>
            <Header />
            <ImageFile />
            <Footer />
        </Fragment>
    )
}

export default admin