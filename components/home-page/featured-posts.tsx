import classes from "./featured-posts.module.css";
import PostsGrid, { Post } from "@/components/posts/posts-grid";
export default function FeaturedPosts(props: { posts: Post[] }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
