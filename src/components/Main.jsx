import React from 'react'
import Mainslide from './Mainslide'
import Payment from './Payment'
import LiveParking from './LiveParking'
import Bannerslide from './Bannerslide'
import Notice from './Notice'
import Footer from './Footer'

const Main = () => {
    return (
        <>
            <Mainslide />
            {/* <Shortcut /> */}
            <Payment />
            <LiveParking />
            <Bannerslide />
            <Notice />
        </>
    )
}

export default Main