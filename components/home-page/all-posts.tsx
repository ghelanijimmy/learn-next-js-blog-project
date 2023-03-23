import classes from "./all-posts.module.css";
import PostsGrid, { Post } from "@/components/posts/posts-grid";
export default function AllPosts(props: { posts: Post[] }) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
