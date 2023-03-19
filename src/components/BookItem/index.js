// import {Component}
import {BsFillStarFill} from 'react-icons/bs'
import {MdFavoriteBorder} from 'react-icons/md'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import FavouriteBooksContext from '../../context/FavouriteBooksContext'
import './index.css'

const BookItem = props => {
  const {each} = props
  const {authorName, rating, id, coverPic, title, readStatus} = each
  let favourite = false

  return (
    <FavouriteBooksContext.Consumer>
      {value => {
        const {favouriteBooksList, addToFavouriteBooks} = value

        const addToFavourite = () => {
          addToFavouriteBooks(each)
        }

        const favBook = favouriteBooksList.find(eachBook => eachBook.id === id)

        if (favBook !== undefined) {
          favourite = true
        } else {
          favourite = false
        }

        const favIconColor = favourite ? (
          <FcLike className="fav-icon-btn" />
        ) : (
          <MdFavoriteBorder color="#475569" className="fav-icon-btn" />
        )

        return (
          <li className="book-item-container">
            <Link to={`/books/${id}`} className="book-item-link">
              <img src={coverPic} alt={title} className="book-image" />
            </Link>
            <div className="book-item-details-container">
              <h1 className="book-title">{title}</h1>
              <p className="book-author">{authorName}</p>
              <p className="avg-rating">
                Avg Rating <BsFillStarFill color="#FBBF24" /> {rating}
              </p>
              <p className="status">
                Status : <span className="read-status">{readStatus}</span>
              </p>
              <p className="add-fav-button" onClick={addToFavourite}>
                Myfavourite: {favIconColor}
              </p>
            </div>
          </li>
        )
      }}
    </FavouriteBooksContext.Consumer>
  )
}

export default BookItem
