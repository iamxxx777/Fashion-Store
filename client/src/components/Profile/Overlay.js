import "../../styles/Account.scss"

const Overlay = ({ click, toggle }) => {
  return (
    <div onClick={click} className={toggle ? 'account_overlay' : null}></div>
  )
}

export default Overlay