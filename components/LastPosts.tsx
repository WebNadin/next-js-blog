import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { A } from "hookrouter";

const LastPosts = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-flow: row wrap;
`;

const PostCard = styled.div`
  margin-bottom: 1rem;
  width: 30%;
`;

const PostTitle = styled.h3`
  cursor: pointer;
  margin: .4rem 0 0;
  color: black;
  font-size: 1.1rem;
  line-height: 1.1;
`;

const PostImg = styled.img`
  cursor: pointer;
  width: 100%;
  display: block;
`;

function DataPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts , setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://simple-blog-api.crew.red/posts')
      .then(response => {
        setLoading(false);
        setPosts(response.data);
        setError('');
      })
      .catch(error => {
        setLoading(false);
        setPosts([]);
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
    <LastPosts>
      {
        posts.map(({ id, date, title, img = 'post1' }) => {
          return (
            (
            <PostCard key={id}>
              <A href={`/posts/${id}`}>
                <PostImg
                  src={`/images/${img}.jpg`}
                  alt={id}
                />
              </A>
              <A href={`/posts/${id}`}>
                <PostTitle active>{title}</PostTitle>
              </A>
            </PostCard>
              )
            )
          })}
      {error ? error: null}
    </LastPosts>
  )
}

export default function LastPostsTemplate() {
  return (
      <>
      <section>
        <p>There is a simple blog page.</p>
      </section>
      < DataPosts />
    </>
  )
}