import { useState } from 'react'

// Components
import MiniNav from '../Nav/MiniNav'
import MobileNav from '../Nav/MobileNav'
import Nav from '../Nav/Nav'
import CategoryNav from '../Nav/CategoryNav'
import SideCategory from '../Nav/SideCategory'
import Overlay from '../Nav/Overlay'
import Footer from '../Footer/Footer'


const Layout = ({ children }) => {

    const [toggleSideNav, setToggleSideNav] = useState(false)

    return (
        <>
            <MiniNav />
            <MobileNav click={() => setToggleSideNav(true)} />
            <Nav />
            <Overlay show={toggleSideNav} click={() => setToggleSideNav(false)} />
            <SideCategory show={toggleSideNav} click={() => setToggleSideNav(false)} />
            <CategoryNav />
            <>{children}</>
            <Footer />
        </>
    )
}

export default Layout