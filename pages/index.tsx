import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Post from "../components/Post";
import LastPosts from "../components/LastPosts";
import { useRoutes, A } from "hookrouter";
import NoPageFound from "../components/NoPageFound";

const routes = {
  '/': () => <LastPosts/>,
  '/posts/:id': ({id}) => <Post postId={id} />
};

export default function Home({
  }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const routeResult = useRoutes(routes);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {routeResult || <NoPageFound />}
    </Layout >
  )
}
