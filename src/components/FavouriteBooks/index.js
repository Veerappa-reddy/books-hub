import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import FavouriteBooksContext from '../../context/FavouriteBooksContext'
import Header from '../Header'
import './index.css'

const FavouriteBooks = () => (
  <FavouriteBooksContext.Consumer>
    {value => {
      const {favouriteBooksList} = value

      return (
        <div className="fav-books-main-container">
          <Header />
          <div className="fav-books-container">
            <h1 className="favourite-books-heading">Favourite Books</h1>
            <div className="fav-books-show-container">
              {favouriteBooksList.length > 0 ? (
                <ul className="fav-un-orderlist">
                  {favouriteBooksList.map(each => (
                    <FavouriteBookItem each={each} />
                  ))}
                </ul>
              ) : (
                <div className="no-fav-books-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                    alt="no saved videos"
                    className="no-fav-books"
                  />
                  <h1 className="no-fav-heading">No Favourite books found</h1>
                  <p className="no-fav-p">
                    Add your favourite books by clicking a button
                  </p>
                  <Link to="/shelf">
                    <button type="button" className="go-books-btn">
                      Go to books
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </FavouriteBooksContext.Consumer>
)

export default FavouriteBooks

const FavouriteBookItem = props => {
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
