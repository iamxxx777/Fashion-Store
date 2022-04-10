import '../../styles/Admin.scss'

const Overlay = ({ click, toggle }) => {
    return (
        <div onClick={click} className={toggle ? 'admin_overlay' : null}></div>
    )
}

export default Overlay