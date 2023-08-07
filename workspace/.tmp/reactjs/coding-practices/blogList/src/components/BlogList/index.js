import './index.css'
import BlogItem from '../BlogItem'

const BlogList = props => {
  const {blogsData} = props
  return (
    <ul className="blogList-container">
      {blogsData.map(item => (
        <BlogItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default BlogList
