import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const BookItem = props => {
  const {each} = props
  const {authorName, rating, id, coverPic, title, readStatus} = each

  return (
    <Link to={`/books/${id}`} className="book-item-link">
      <li className="book-item-container">
        <img src={coverPic} alt={title} className="book-image" />
        <div className="book-item-details-container">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <p className="avg-rating">
            Avg Rating <BsFillStarFill color="#FBBF24" /> {rating}
          </p>
          <p className="status">
            Status : <span className="read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
