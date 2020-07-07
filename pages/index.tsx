import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import styled from 'styled-components'

const posts = [
  {
    id: '1',
    title: 'Post title 1',
    description: 'Post description 1',
    date: '2020-02-01',
    img: 'post1'
  },
  {
    id: '2',
    title: 'Post title 2',
    description: 'Post description 2',
    date: '2020-02-01',
    img: 'post1'
  },
  {
    id: '3',
    title: 'Post title 3',
    description: 'Post description 3',
    date: '2020-02-01',
    img: 'post1'
  }
];

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

const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://simple-blog-api.crew.red/posts')
  .then(function (response) {
    // handle success
    console.log(response.data[0]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    console.log('then next');
    // always executed
  });

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
      <section className={utilStyles.headingMd}>
        <p>There is a simple blog page.</p>
      </section>
      <LastPosts>
        {posts.map(({ id, date, title, img = 'post1' }) => (
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
          <small>
            <Date dateString={date}/>
          </small>
        </PostCard>
          ))}
      </LastPosts>
    </Layout>
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