import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
        <ul>
            <li><Link to="/blogposts">Blogssss</Link></li>
            <li><Link to="/viewblogs">ViewBlogsss</Link></li>
        </ul>
    </div>
  )
}

export default HomePage