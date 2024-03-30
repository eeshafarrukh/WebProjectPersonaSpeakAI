import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import blogContents from './blogContents';

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigateToBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const filteredBlogContents = Object.entries(blogContents).filter(([blogId, { title, content }]) =>
    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Blog-Wrapper">
      <div className="Blog-ContentWrapper">
        <div className="Blog-Header">
          <h1 className="Blog-PrimaryHeading">Our Blog</h1>
          <p className="Blog-PrimaryText">Welcome to our latest news and insights on interview skills!</p>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="Blog-SearchBar"
          />
        </div>
        <div className="Blog-Posts">
          {filteredBlogContents.map(([blogId, { title, content }], index) => (
            <div className="Blog-Post" key={blogId}>
              <h2 className="Blog-PrimaryHeading">{title}</h2>
              <img src={`/images/${index + 1}.jpg`} alt={title} className="Blog-PostImage"/>
              <p className="Blog-PrimaryText">{content.substring(0, 150)}...</p>
              <button onClick={() => navigateToBlog(blogId)} className="Blog-ActionButton">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
