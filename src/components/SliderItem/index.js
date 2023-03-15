import './index.css'

const SliderItem = props => {
  const {each} = props
  const {title, authorName, coverPic} = each

  return (
    <li className="slider-item-container">
      <img src={coverPic} alt={title} className="slider-image" />
      <h1 className="slider-book-title">{title}</h1>
      <p className="slider-book-author">{authorName}</p>
    </li>
  )
}

export default SliderItem
