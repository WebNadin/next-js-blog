import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DataPost(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post , setPost] = useState({});

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
    <section>
      <h1>
        {post.title}
      </h1>
      <img
        src={`/images/${post.img || 'post1'}.jpg`}
        alt={post.id}
      />
      <div>
        {post.body}
      </div>
    </section>
  )
}