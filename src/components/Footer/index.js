import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <AiOutlineGoogle className="footer-icon" />
      <AiOutlineTwitter className="footer-icon" />
      <AiOutlineInstagram className="footer-icon" />
      <AiFillYoutube className="footer-icon" />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
