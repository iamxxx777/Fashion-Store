import React from 'react'

// MUI ICONS
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

// STYLES
import '../../styles/Admin.scss'

const Header = ({ click }) => {
    return (
        <header className="admin_header">
            <div className="container">
                <div className="header_info">
                    <div className="mb-btn">
                        <button onClick={click}><MenuOutlinedIcon /></button>
                    </div>
                    <div className="info">
                        <div className="avatar">
                            H
                        </div>
                    </div>
                </div>
                <div className="search_form">
                    <form>
                        <input type="text" placeholder='Search for a product' />
                        <button><SearchOutlinedIcon /></button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header