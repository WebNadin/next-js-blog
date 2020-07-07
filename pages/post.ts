import axios from 'axios'
import React, { useState, useEffect, useReducer } from 'react'

function DataPost() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts , setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://simple-blog-api.crew.red/post/')
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
      <div>
        Loadig...
        </div>
  );
  else return (
    <div>
        test 2
        </div>
  )
}