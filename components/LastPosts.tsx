import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { A } from "hookrouter";
import utilStyles from '../styles/utils.module.css';

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
    <section className={utilStyles.lastPosts}>
      {
        posts.map(({ id, date, title, img = 'post1' }) => {
          return (
            (
            <div key={id} className={utilStyles.postCard}>
              <A href={`/posts/${id}`}>
                <img className={utilStyles.postImg}
                  src={`/images/${img}.jpg`}
                  alt={id}
                />
              </A>
              <A href={`/posts/${id}`}>
                <h3 className={utilStyles.postTitle}>{title}</h3>
              </A>
            </div>
              )
            )
          })}
      {error ? error: null}
    </section>
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