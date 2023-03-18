import {Link} from 'react-router-dom'
import FavouriteBooksContext from '../../context/FavouriteBooksContext'
import Header from '../Header'
import BookItem from '../BookItem'
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
                    <BookItem each={each} />
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
