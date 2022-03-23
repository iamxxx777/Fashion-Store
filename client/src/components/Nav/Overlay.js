import '../../styles/SideCategory.scss'

const Overlay = ({ click, show }) => {
  return (
    <div className={show ? 'side_overlay' : null} onClick={click}></div>
  )
}

export default Overlay