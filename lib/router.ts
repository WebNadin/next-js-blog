import Post from "../components/Post";
import LastPosts from "../components/LastPosts";

const Routes = {
  '/': () => {LastPosts},
  '/post/:id': ({id}) => {Post}
  //'/posts/new': () => <NewPost/>
};
export default Routes;