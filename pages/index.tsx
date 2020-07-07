import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
//import reducer from '../reducer'
import LastPosts from "../components/LastPosts";

import { useRoutes, A } from "hookrouter";
//import Routes from "../lib/router";
import NoPageFound from "../components/NoPageFound";

const routes = {
  '/': () => <LastPosts/>,
  '/user/:id': ({id}) => <Post userId={id} />
};


export default function Home({
  allPostsData
  }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const routeResult = useRoutes(routes);
  console.log("routeResult =", routeResult);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {routeResult || <NoPageFound />}
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