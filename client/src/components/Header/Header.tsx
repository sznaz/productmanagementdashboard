// import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div className='headerWrapper'> 
        <h3 className='title'>
            Product Management Dashboard
        </h3>
        {/* <nav className="menu">
            <Link to='/' className='menuItem'>Products</Link>
            <Link to='/new' className='menuItem'>Add Product</Link>
        </nav> */}
    </div>
  )
}

export default Header