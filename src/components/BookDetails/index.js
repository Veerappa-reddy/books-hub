import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {apiStatus: apiStatusConstants.initial, bookDetails: {}}
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookDetailsView = () => {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetails

    return (
      <div className="bookdetails-container">
        <div className="bookitem-container">
          <div className="item-info-container">
            <img src={coverPic} alt={title} className="bookdetail-image" />
            <div className="info-text-container">
              <h1 className="bookdetail-heading">{title}</h1>
              <p className="bookdetail-author">{authorName}</p>
              <p className="bookdetail-rating">
                Avg Rating <BsFillStarFill color="#FBBF24" /> {rating}
              </p>
              <p className="bookdetail-status">
                Status: <span className="read-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="about-container">
            <h1 className="about-author">About Author</h1>
            <p className="author-paragraph">{aboutAuthor}</p>
          </div>
          <div className="about-container">
            <h1 className="about-author">About Book</h1>
            <p className="author-paragraph">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  tryAgain = () => {
    this.getBookDetails()
  }

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

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)

    return (
      <div className="bookdetails-bg-container ">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default BookDetails
