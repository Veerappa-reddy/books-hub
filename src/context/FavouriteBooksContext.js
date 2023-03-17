import React from 'react'

const FavouriteBooksContext = React.createContext({
  favouriteBooksList: [],
  addToFavouriteBooks: () => {},
})

export default FavouriteBooksContext
