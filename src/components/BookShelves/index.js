import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import BookItem from '../BookItem'
import './index.css'
import Footer from '../Footer'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    booksList: [],
    apiStatus: apiStatusConstants.initial,
    searchText: '',
    bookshelfName: bookshelvesList[0].value,
    displayLabel: bookshelvesList[0].label,
    activeStatusId: bookshelvesList[0].id,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchText, bookshelfName} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        authorName: book.author_name,
        coverPic: book.cover_pic,
        id: book.id,
        rating: book.rating,
        readStatus: book.read_status,
        title: book.title,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  tryAgain = () => {
    this.getBooksData()
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  renderBooksView = () => {
    const {booksList, searchText} = this.state
    return booksList.length > 0 ? (
      <>
        <ul className="books-container">
          {booksList.map(book => (
            <BookItem each={book} key={book.id} />
          ))}
        </ul>
        <Footer />
      </>
    ) : (
      <div className="no-results-container">
        <img
          src="https://res.cloudinary.com/veerappa/image/upload/v1678942046/no_reslts_svg_hdmj6d.svg"
          alt="no books"
          className="no-results-img"
        />
        <p className="no-result-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failue-container">
      <img
        src="https://res.cloudinary.com/veerappa/image/upload/v1678873573/failure_img_gq42aw.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong, Please try again</p>
      <button type="button" className="try-again-btn" onClick={this.tryAgain}>
        Try Again
      </button>
    </div>
  )

  clickBookShelve = (id, label, value) => {
    this.setState(
      {bookshelfName: value, activeStatusId: id, displayLabel: label},
      this.getBooksData,
    )
  }

  searchResults = () => {
    this.getBooksData()
  }

  onEnterSearchText = event => {
    if (event.key === 'Enter') {
      this.getBooksData()
    }
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {displayLabel, activeStatusId} = this.state

    return (
      <div className="bookshelves-container">
        <Header />
        <div className="mobile-bookshelves-container">
          <div className="mobile-input-container">
            <input
              type="search"
              className="input-element mobile-input"
              placeholder="Search"
              onChange={this.onChangeSearchText}
              onKeyDown={this.onEnterSearchText}
            />
            <button
              type="button"
              className="search-icon-container"
              onClick={this.searchResults}
              testid="searchButton"
            >
              <BsSearch color="#94A3B8" />
            </button>
          </div>
          <h1 className="mobile-bookshelve-heading">Bookshelves</h1>
          <ul className="mobile-shelves-list">
            {bookshelvesList.map(each => (
              <MobileShelveItem
                each={each}
                key={each.id}
                clickBookShelve={this.clickBookShelve}
                isActive={each.id === activeStatusId}
              />
            ))}
          </ul>
        </div>
        <div className="bookshelves-bg-container">
          <ul className="bookshelves-list-container">
            <h1 className="bookshelve-heading">Bookshelves</h1>
            {bookshelvesList.map(each => (
              <ShelveItem
                each={each}
                key={each.id}
                clickBookShelve={this.clickBookShelve}
                isActive={each.id === activeStatusId}
              />
            ))}
          </ul>
          <div className="search-books-container">
            <div className="search-text-container">
              <h1 className="search-books-heading">{displayLabel} Books</h1>
              <div className="input-container">
                <input
                  type="search"
                  className="input-element"
                  placeholder="Search"
                  onChange={this.onChangeSearchText}
                  onKeyDown={this.onEnterSearchText}
                />
                <button
                  type="button"
                  className="search-icon-container"
                  onClick={this.searchResults}
                  testid="searchButton"
                >
                  <BsSearch color="#94A3B8" />
                </button>
              </div>
            </div>
            {this.renderApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves

const ShelveItem = props => {
  const {each, clickBookShelve, isActive} = props
  const {id, label, value} = each

  const bookShelveOption = () => {
    clickBookShelve(id, label, value)
  }

  const shelfOption = isActive ? 'active-option' : 'book-shelve-button'

  return (
    <li className="shelve-item">
      <button type="button" className={shelfOption} onClick={bookShelveOption}>
        {label}
      </button>
    </li>
  )
}

const MobileShelveItem = props => {
  const {each, clickBookShelve, isActive} = props
  const {id, label, value} = each

  const bookShelveOption = () => {
    clickBookShelve(id, label, value)
  }

  const shelfOption = isActive ? 'active-option' : 'book-shelve-button'

  return (
    <li className="mobile-shelve-item">
      <button type="button" className={shelfOption} onClick={bookShelveOption}>
        {label}
      </button>
    </li>
  )
}
