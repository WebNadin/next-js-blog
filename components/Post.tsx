import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DataPost(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post , setPost] = useState({});
  const Post = styled.section`
  `;

  const PostTitle = styled.h1`
  `;

  const PostImage = styled.img`
    width: 100%;
    display: block;
    margin-bottom: 1rem;
  `;

  const PostBody = styled.div`
  `;
  useEffect(() => {
    axios.get(`https://simple-blog-api.crew.red/posts/${props.postId}`)
      .then(response => {
        setLoading(false);
        setPost(response.data);
        setError('');
      })
      .catch(error => {
        setLoading(false);
        setPost({});
        setError('Что-то пошло не так...');
      })
  }, []);

  if (loading) return (
      <>
      {'Loading...'}
      {error ? error: null}
    </>
  );
  else return (
    <Post>
      <PostTitle>
        {post.title}
      </PostTitle>
      <PostImage
        src={`/images/${post.img || 'post1'}.jpg`}
        alt={post.id}
      />
      <PostBody>
        {post.body}
      </PostBody>
    </Post>
  )
}