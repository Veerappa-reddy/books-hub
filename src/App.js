import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import FavouriteBooks from './components/FavouriteBooks'
import ProtectedRoute from './components/ProtectedRoute'
import FavouriteBooksContext from './context/FavouriteBooksContext'
import './App.css'

class App extends Component {
  state = {favouriteBooksList: []}

  removeFavItem = item => {
    const {favouriteBooksList} = this.state
    const filteredList = favouriteBooksList.filter(each => each.id !== item.id)
    this.setState({favouriteBooksList: filteredList})
  }

  addToFavouriteBooks = item => {
    const {favouriteBooksList} = this.state
    const updatedList = favouriteBooksList.find(each => each.id === item.id)

    if (favouriteBooksList.length === 0) {
      this.setState(prevState => ({
        favouriteBooksList: [...prevState.favouriteBooksList, item],
      }))
    } else if (updatedList === undefined) {
      this.setState(prevState => ({
        favouriteBooksList: [...prevState.favouriteBooksList, item],
      }))
    } else {
      this.removeFavItem(item)
    }
  }

  render() {
    const {favouriteBooksList} = this.state
    console.log(favouriteBooksList)

    return (
      <FavouriteBooksContext.Provider
        value={{
          favouriteBooksList,
          addToFavouriteBooks: this.addToFavouriteBooks,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <ProtectedRoute exact path="/favourites" component={FavouriteBooks} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </FavouriteBooksContext.Provider>
    )
  }
}
export default App
