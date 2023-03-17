import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  clicksMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  closeMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    console.log(showMenu)

    return (
      <>
        <div className="header-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/veerappa/image/upload/v1678698519/book%20hub%20image%20resource/Group_ucuuwf.svg"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
          <ul className="header-unorderlist">
            <Link to="/" className="nav-link">
              <li className="header-list-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="header-list-item">Booksheleves</li>
            </Link>
            <Link to="/favourites" className="nav-link">
              <li className="header-list-item">Favourite Books</li>
            </Link>
            <li>
              <button
                type="button"
                className="logout-button"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <GiHamburgerMenu
            className="menu"
            size={25}
            onClick={this.clicksMenu}
          />
        </div>
        {showMenu && (
          <ul className="mobile-header-unorderlist">
            <Link to="/" className="nav-link">
              <li className="mobile-header-list-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="mobile-header-list-item">Booksheleves</li>
            </Link>
            <Link to="/favourites" className="nav-link">
              <li className="mobile-header-list-item">Favourite Books</li>
            </Link>
            <li>
              <button
                type="button"
                className="mobile-logout-button"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </li>
            <AiFillCloseCircle
              size={25}
              color="#334155"
              onClick={this.closeMenu}
            />
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
