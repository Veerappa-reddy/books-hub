import {AiFillStar} from 'react-icons/ai'
import './index.css'

const BookItem = props => {
  const {each} = props
  const {authorName, rating, coverPic, title, readStatus} = each
  //   console.log(rating)

  return (
    <li className="book-item-container">
      <img src={coverPic} alt="title" className="book-image" />
      <div className="book-item-details-container">
        <h1 className="book-title">{title}</h1>
        <p className="book-author">{authorName}</p>
        <p className="avg-rating">
          Avg Rating <AiFillStar color="#FBBF24" /> {rating}
        </p>
        <p className="status">Status : {readStatus}</p>
      </div>
    </li>
  )
}

export default BookItem
