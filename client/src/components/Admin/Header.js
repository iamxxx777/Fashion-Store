import { useHistory } from 'react-router-dom'

// MUI ICONS
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

// STYLES
import '../../styles/Admin.scss'

const Header = ({ click }) => {

    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault()

        if(e.target.search.value === "") return

        const keyword = e.target.search.value.toLowerCase()

        history.push(`/admin/search/?keyword=${keyword}`)
        e.target.search.value = ''
    }

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
                    <form onSubmit={(e) => handleSearch(e)}>
                        <input type="text" name='search' placeholder='Search for a product' />
                        <button><SearchOutlinedIcon /></button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header