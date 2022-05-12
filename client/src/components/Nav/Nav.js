import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import '../../styles/Nav.scss'

const Nav = () => {

    const { cartItems } = useSelector((state) => state.cart)
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault()

        if(e.target.search.value === "") return
        
        const keyword = e.target.search.value.toLowerCase()

        history.push(`/search/${keyword}`)
        e.target.search.value = ''
    }

    return (
        <div className='header'>
            <div className="header_container">
                <div className="search_div">
                    <div className="header_logo hide">
                        <Link to="/"><h2>Chavonn</h2></Link>
                    </div>
                    <div className="search_bar">
                        <div className="search">
                            <form onSubmit={(e) => handleSearch(e)}>
                                <input type="text" name="search" placeholder='Search by name, category or brand...' />
                                <button type="submit">
                                    <SearchOutlinedIcon />
                                </button>
                            </form>
                        </div>
                        <div className="header_btns hide">
                            <Link to="/account">
                                <div>
                                    <PersonOutlineOutlinedIcon />
                                </div>
                            </Link>
                            <Link to="/cart">
                                <div className="header_cart">
                                    <ShoppingCartOutlinedIcon />
                                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Nav;
