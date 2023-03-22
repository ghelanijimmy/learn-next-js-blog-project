import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedPosts } from "@/lib/posts-util";
import { Post } from "@/components/posts/posts-grid";

export default function Home(props: { posts: Post[] }) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const posts = getFeaturedPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}
