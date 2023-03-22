import AllPosts from "@/pages/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import { Post } from "@/components/posts/posts-grid";

export default function Posts(props: { posts: Post[] }) {
  return <AllPosts posts={props.posts} />;
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
