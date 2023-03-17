import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/veerappa/image/upload/v1678943154/page_not_found_stugru.svg"
      alt="page not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-p">
      we are sorry, the page you requested could not be found
    </p>
    <p className="not-found-p2">Please go back to the homepage</p>
    <Link to="/">
      <button type="button" className="not-found-btn ">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
