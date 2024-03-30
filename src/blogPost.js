import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Blog.css';
import blogContents from './blogContents';

function BlogPost() {
  const { blogId } = useParams();
  const post = blogContents[blogId];
  const postIndex = Object.keys(blogContents).indexOf(blogId) + 1;
  const navigate = useNavigate();

  if (!post) {
    return <div className="Blog-PostNotFound">Post not found!</div>;
  }

  const handleBack = () => {
    navigate('/blogPage');
  };

  return (
    <div className="Blog-PostWrapper2">
      <h1 className="Blog-PostTitle">{post.title}</h1>
      <img src={`/images/${postIndex}.jpg`} alt={post.title} className="Blog-PostImage"/>
      <div className="Blog-PostContent">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <button className="Blog-BackButton" onClick={handleBack}>Back to Blogs</button>
    </div>
  );
}

export default BlogPost;
