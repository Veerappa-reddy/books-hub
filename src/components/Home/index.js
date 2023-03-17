import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import Footer from '../Footer'
import SliderItem from '../SliderItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {topRatedBooksList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooksData()
  }

  getTopRatedBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTopRatedBooksView = () => {
    const {topRatedBooksList} = this.state

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="slider-un-orderlist">
        <Slider {...settings}>
          {topRatedBooksList.map(each => (
            <SliderItem each={each} key={each.id} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  tryAgain = () => {
    this.getTopRatedBooksData()
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
        Try again
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedBooksView()
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
      <div className="home-container">
        <Header />
        <div className="home-page-text-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-paragraph">
            You are in the right place.Tell us what titles or genres you have
            enjoyed in the past,and you will give you surprisingly insightful
            recommandations.
          </p>
          <Link to="/shelf" className="home-link">
            <button
              type="button"
              className="find-books-button mobile-device-button"
            >
              Find Books
            </button>
          </Link>
          <div className="top-rated-books-container">
            <div className="find-books-container">
              <h1 className="top-rated-books-heading">Top Rated Books</h1>
              <Link to="/shelf" className="home-link">
                <button
                  type="button"
                  className="find-books-button large-device-button"
                >
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderApiStatus()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
