import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => (
  <div className="header-container">
    <img
      src="https://res.cloudinary.com/veerappa/image/upload/v1678698519/book%20hub%20image%20resource/Group_ucuuwf.svg"
      alt="website logo"
      className="header-website-logo"
    />
    <ul className="header-unorderlist">
      <li className="header-list-item">Home</li>
      <li className="header-list-item">BookSheleves</li>
      <li>
        <button type="button" className="logout-button">
          Logout
        </button>
      </li>
    </ul>
    <GiHamburgerMenu className="menu" size={25} />
  </div>
)

export default Header
