import {Link} from 'react-router-dom'
import './index.css'

const SliderItem = props => {
  const {each} = props
  const {title, authorName, coverPic, id} = each

  return (
    <Link to={`/books/${id}`} className="book-item-link">
      <li className="slider-item-container">
        <img src={coverPic} alt={title} className="slider-image" />
        <h1 className="slider-book-title">{title}</h1>
        <h1 className="slider-book-author">{authorName}</h1>
      </li>
    </Link>
  )
}

export default SliderItem
