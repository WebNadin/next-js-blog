import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducer'

//interface Post {
//  id: string | number,
//  body: string;
//  title: string;
//}
//
//let postsGet:Post[] = [];

function DataPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://simple-blog-api.crew.red/posts')
      .then(response => {
        setLoading(false);
        setPosts(response.data);
        setError('');
      })
      .catch(error => {
        setLoading(false);
        setPosts({});
        setError('Что-то пошло не так...');
      })
  }, []);
  if (loading) return (
      <>
      {'Loading'}
      {error ? error: null}
    </>
  );
  else return (
      <>
      {
        posts.map(({ id, date, title, img = 'post1' }) => (
        <PostCard key={id}>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <PostImg
              src={`/images/${img}.jpg`}
              alt={id}
            />
          </Link>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <PostTitle active>{title}</PostTitle>
          </Link>
        </PostCard>
          ))}
      {error ? error: null}
    </>
  )
}

const LastPosts = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-flow: row wrap;
`;

const PostCard = styled.div`
  width: 30%;
  flex-shrink: 0;
`;

const PostTitle = styled.h3 < {active: boolean} > `
  cursor: pointer;
  margin: .4rem 0 0;
  color: ${props => (props.active ? 'red' : 'black')};
  font-size: 1.5rem;
`;
const PostDate = styled.small`
  opacity: .5;
`;

const PostImg = styled.img`
  cursor: pointer;
  width: 100%;
  display: block;
`;

export default function Home({
  allPostsData
  }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>There is a simple blog page.</p>
      </section>
      <LastPosts>
        <DataPosts/>
      </LastPosts >
    </Layout >
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
};