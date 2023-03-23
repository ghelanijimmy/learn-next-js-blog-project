import AllPosts from "@/components/home-page/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import { Post } from "@/components/posts/posts-grid";
import Head from "next/head";

export default function Posts(props: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related posts"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
